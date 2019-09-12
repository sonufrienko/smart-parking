const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'Parking';

const prepareProperties = item => ({
  parkingID: item.parkingID,
  address: item.address,
  features: item.features,
  location: item.location,
  openingHours: item.openingHours,
  rate: item.rate,
  title: item.title,
  slots: []
})

function fetchParkingByFilter(filter) {
  const params = {
    TableName : DYNAMODB_TABLE,
    FilterExpression : 'slotNumber = :slotNumber',
    ExpressionAttributeValues : {
      ':slotNumber' : 'info'
    }
  };
  
  return db.scan(params).promise();
}

function fetchParkingByID(parkingID) {
  const params = {
    TableName : DYNAMODB_TABLE,
    Key: {
      parkingID,
      slotNumber: 'info'
    }
  };
  
  return db.get(params).promise();
}

async function listParking(filter) {
  if (filter && filter.parkingID) {
    const { Item } = await fetchParkingByID(filter.parkingID);
    return [prepareProperties(Item)];
  }

  const { Items } = await fetchParkingByFilter(filter);
  return Items.map(prepareProperties);
}

exports.handler = async (event, context) => {
  try {
    const result = await listParking(event.arguments.filter);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
