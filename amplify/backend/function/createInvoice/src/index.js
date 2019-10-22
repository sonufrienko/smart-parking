const AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const USER_TABLE = 'ParkingUser';
const PARKING_TABLE = 'Parking';

const prepareProperties = item => ({
  parkingID: item.parkingID,
  invoiceID: item.invoiceID,
  slotNumber: item.slotNumber,
  dateFrom: String(item.dateFrom),
  dateTo: String(item.dateTo),
  plateNumber: item.plateNumber,
  price: 0,
  parking: {}
});

const createInvoice = async ({ userID, invoiceID, parkingID, slotNumber, dateFrom, plateNumber }) => {
  const params = {
    TableName: USER_TABLE,
    Item: {
      userID,
      invoiceID,
      parkingID,
      slotNumber,
      dateFrom: Number(dateFrom),
      plateNumber
    }
  };

  return db.put(params).promise();
};

const getInvoice = async ({ userID, invoiceID }) => {
  const params = {
    TableName: USER_TABLE,
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

const getParkingSlot = async ({ parkingID, slotNumber }) => {
  const params = {
    TableName: PARKING_TABLE,
    Key: {
      parkingID,
      slotNumber
    }
  };

  const { Item } = await db.get(params).promise();
  return Item;
}

const getIsParkingSlotExists = async ({ parkingID, slotNumber }) => !! await getParkingSlot({ parkingID, slotNumber });

exports.handler = async (event, context) => {
  try {
    const isParkingSlotExists = await getIsParkingSlotExists(event.arguments.input);
    if (!isParkingSlotExists) {
      return context.done({
        statusCode: 400,
        message: 'Parking slot not found.'
      }, null);
    }

    const invoiceData = getInvoiceData(event);
    await createInvoice(invoiceData);
    const result = await getInvoice(invoiceData);
    
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
