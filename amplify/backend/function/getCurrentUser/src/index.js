const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'ParkingUser';

const prepareUserProperties = item => ({
  userID: item.userID,
  vehicles: item.vehicles,
  fullName: item.fullName
})

const prepareInvoiceProperties = item => ({
  parkingID: item.parkingID,
  invoiceID: item.invoiceID,
  slotNumber: item.slotNumber,
  dateFrom: item.dateFrom,
  dateTo: item.dateTo,
  plateNumber: item.plateNumber,
  price: item.price,
  parking: {}
})

const getUserAndInvoices = userID => {
  const params = {
    TableName: DYNAMODB_TABLE,
    KeyConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: { ':userID': userID }
  };

  return db.query(params).promise();
};

async function getUser(userID) {
  const { Items } = await getUserAndInvoices(userID);
  const user = Items.find(item => item.invoiceID === 'info');
  const invoices = Items.filter(item => item.invoiceID !== 'info');
  
  const result = prepareUserProperties(user);
  result.invoices = invoices.map(prepareInvoiceProperties);
  return result;
}

exports.handler = async (event, context) => {
  try {
    // get AWS Cognito user ID
    const userID = event.identity.sub;
    const result = await getUser(userID);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
