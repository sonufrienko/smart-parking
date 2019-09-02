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

async function listParking({ filter }) {
    const params = {
      TableName : DYNAMODB_TABLE,
      FilterExpression : 'slotNumber = :slotNumber',
      ExpressionAttributeValues : {
        ':slotNumber' : 'info'
      }
    };
    
    const { Items } = await db.scan(params).promise();
    return Items.map(prepareProperties);
}

exports.handler = async (event, context) => {
  try {
    const result = await listParking(event.arguments);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
