const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const TABLE_PARKING = 'Parking';
const TABLE_USER = 'ParkingUser';

const prepareProperties = item => ({
  parkingID: item.parkingID,
  invoiceID: item.invoiceID,
  slotNumber: item.slotNumber,
  dateFrom: String(item.dateFrom),
  dateTo: String(item.dateTo),
  plateNumber: item.plateNumber,
  price: item.price,
  parking: {}
});

const updateInvoice = ({ userID, invoiceID, dateTo, price }) => {
  const params = {
    TableName: TABLE_USER,
    Key: {
      userID,
      invoiceID
    },
    UpdateExpression: 'set dateTo = :dateTo, price = :price',
    ExpressionAttributeValues: {
      ':dateTo': Number(dateTo),
      ':price': price
    },
    ReturnValues: 'ALL_NEW'
  };

  return db.update(params).promise();
};

const fetchParkingRate = async parkingID => {
  const params = {
    TableName: TABLE_PARKING,
    Key: {
      parkingID,
      slotNumber: 'info'
    },
    ProjectionExpression: 'rate'
  };

  const {
    Item: { rate }
  } = await db.get(params).promise();
  return rate;
};

const fetchInvoiceDateFrom = async ({ userID, invoiceID }) => {
  const params = {
    TableName: TABLE_USER,
    Key: {
      userID,
      invoiceID
    },
    ProjectionExpression: 'dateFrom'
  };

  const {
    Item: { dateFrom }
  } = await db.get(params).promise();
  return Number(dateFrom);
};

const getParkingPrice = ({ durationInHours, rate }) => (durationInHours * rate).toFixed(2);

const getParkingDurationInHours = ({ dateFrom, dateTo }) => Math.ceil((dateTo - dateFrom) / 1000 / 60 / 60);

const closeInvoice = async ({ parkingID, userID, invoiceID }) => {
  const [parkingRate, invoiceDateFrom] = await Promise.all([
    fetchParkingRate(parkingID),
    fetchInvoiceDateFrom({ userID, invoiceID })
  ]);

  const dateTo = Date.now();

  const durationInHours = getParkingDurationInHours({ dateFrom: invoiceDateFrom, dateTo });
  const price = getParkingPrice({ durationInHours, rate: parkingRate });

  const { Attributes: invoice } = await updateInvoice({ userID, invoiceID, dateTo, price });
  return prepareProperties(invoice);
};

exports.handler = async (event, context) => {
  try {
    const invoiceData = {
      ...event.arguments.input,
      userID: event.identity.sub
    };
    const result = await closeInvoice(invoiceData);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
