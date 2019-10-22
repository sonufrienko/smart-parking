const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'ParkingUser';

const prepareUserProperties = item => ({
  userID: item.userID,
  vehicles: item.vehicles,
  fullName: item.fullName
});

const prepareInvoiceProperties = item => ({
  parkingID: item.parkingID,
  invoiceID: item.invoiceID,
  slotNumber: item.slotNumber,
  dateFrom: String(item.dateFrom),
  dateTo: String(item.dateTo),
  plateNumber: item.plateNumber,
  price: item.price,
  parking: {}
});

const getUserAndInvoices = userID => {
  const params = {
    TableName: DYNAMODB_TABLE,
    KeyConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: { ':userID': userID }
  };

  return db.query(params).promise();
};

async function getUser({ userID, email, phone }) {
  const { Items } = await getUserAndInvoices(userID);
  const invoices = Items
    .filter(item => item.invoiceID !== 'info')
    .sort((a, b) => a.dateFrom > b.dateFrom ? -1 : a.dateFrom < b.dateFrom ? 1 : 0)
    .map(prepareInvoiceProperties);

  const userRaw = Items.find(item => item.invoiceID === 'info');
  const user = prepareUserProperties(userRaw);

  return {
    ...user,
    invoices,
    email,
    phone
  };
}

exports.handler = async (event, context) => {
  try {
    // get AWS Cognito user ID
    const {
      identity: {
        sub: userID,
        claims: { phone_number: phone, email }
      }
    } = event;

    const result = await getUser({ userID, email, phone });
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
