const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'ParkingUser';

const prepareProperties = item => ({
  parkingID: item.parkingID,
  invoiceID: item.invoiceID,
  slotNumber: item.slotNumber,
  dateFrom: item.dateFrom,
  dateTo: item.dateTo || '',
  plateNumber: item.plateNumber,
  price: 0,
  parking: {}
});

const createInvoice = async ({ userID, invoiceID, parkingID, slotNumber, dateFrom, plateNumber }) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Item: {
      userID,
      invoiceID,
      parkingID,
      slotNumber,
      dateFrom,
      plateNumber
    }
  };

  return db.put(params).promise();
};

const getInvoice = async ({ userID, invoiceID }) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      userID,
      invoiceID
    }
  };

  const { Item } = await db.get(params).promise();
  return prepareProperties(Item);
};

const getInvoiceData = event => ({
  ...event.arguments.input,
  userID: event.identity.sub,
  invoiceID: uuidv1(),
  dateFrom: String(Date.now())
});

exports.handler = async (event, context) => {
  try {
    const invoiceData = getInvoiceData(event);
    await createInvoice(invoiceData);
    const result = await getInvoice(invoiceData);
    
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
