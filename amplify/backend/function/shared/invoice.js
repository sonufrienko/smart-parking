const slotService = require('./slot');
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const PARKING_TABLE = 'Parking';
const RATE_HOUR = 5;

const getParkingPrice = ({ durationInHours, rate }) => (durationInHours * rate).toFixed(2);

const getParkingDurationInHours = ({ dateFrom, dateTo }) => Math.ceil((dateTo - dateFrom) / 1000 / 60 / 60);

const getLastBySlotPK = ({ slotPK, limit = 10 }) => {
  const params = {
    TableName: PARKING_TABLE,
    IndexName: 'PKDateFromIndex',
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: { ':pk': slotPK },
    ScanIndexForward: false,
    Limit: limit
  };

  return client.query(params).promise();
};

const createInvoice = ({ slotPK, userID, plateNumber }) => {
  const invoiceID = Date.now();

  const params = {
    TableName: PARKING_TABLE,
    Item: {
      PK: slotPK,
      SK: `inv#${invoiceID}`,
      UserID: userID,
      PlateNumber: plateNumber.toString(),
      DateFrom: Date.now()
    }
  };

  return client
    .put(params)
    .promise()
    .then(() => invoiceID);
};

const startParking = async ({ slotNumber, userID, plateNumber }) => {
  const {
    Items: [{ PK: slotPK }]
  } = await slotService.getBySlotNumber({ slotNumber });
  const invoiceID = await createInvoice({ slotPK, userID, plateNumber });
  const { Items: [invoice] } = await getInvoice({ invoiceID, userID });
  invoice.SlotID = slotPK;
  return invoice;
};

const getInvoice = ({ invoiceID, userID }) => {
  const params = {
    TableName: PARKING_TABLE,
    IndexName: 'InvoiceIndex',
    KeyConditionExpression: 'SK = :invoiceID and UserID = :userID',
    ExpressionAttributeValues: { ':invoiceID': `inv#${invoiceID}`, ':userID': userID },
    Limit: 1
  };

  return client.query(params).promise();
};

const updateInvoice = ({ PK, SK, dateTo, price }) => {
  const params = {
    TableName: PARKING_TABLE,
    Key: { PK, SK },
    IndexName: 'InvoiceIndex',
    UpdateExpression: 'set DateTo = :dateTo, Price = :price',
    ExpressionAttributeValues: {
      ':dateTo': dateTo,
      ':price': Number(price)
    }
  };

  return client.update(params).promise();
};

const finishParking = async ({ invoiceID, userID }) => {
  const {
    Items: [invoice]
  } = await getInvoice({ invoiceID, userID });
  const { PK, SK, DateFrom: dateFrom } = invoice;

  const dateTo = Date.now();
  const durationInHours = getParkingDurationInHours({ dateFrom, dateTo });
  const price = getParkingPrice({ durationInHours, rate: RATE_HOUR });

  await updateInvoice({ PK, SK, dateTo, price });
  const { Items: [updatedInvoice] } = await getInvoice({ invoiceID, userID });
  updatedInvoice.SlotID = PK;
  return updatedInvoice;
};

const listInvoices = async ({ userID }) => {
  const params = {
    TableName : PARKING_TABLE,
    FilterExpression : 'UserID = :userID',
    ExpressionAttributeValues : {':userID' : userID}
  };
  
  const { Items: invoices } = await client.scan(params).promise();
  return invoices;
}

module.exports = {
  startParking,
  finishParking,
  getLastBySlotPK,
  listInvoices
};
