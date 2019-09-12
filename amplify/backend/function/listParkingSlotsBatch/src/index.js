const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'Parking';

const prepareProperties = item => ({
  parkingID: item.parkingID,
  device: item.device,
  slotNumber: item.slotNumber,
  slotStatus: item.slotStatus
});

async function listParkingSlots(parkingArray) {
  const filterInKeys = parkingArray.map((v, i) => `:${i}`).join(', ');
  const values = {
    ':info': 'info'
  };
  parkingArray.forEach((v, i) => (values[`:${i}`] = v.parkingID));

  const params = {
    TableName: DYNAMODB_TABLE,
    FilterExpression: `parkingID IN (${filterInKeys}) AND slotNumber <> :info`,
    ExpressionAttributeValues: values
  };

  const { Items } = await db.scan(params).promise();
  const result = parkingArray.map(({ parkingID }) =>
    Items.filter(item => item.parkingID === parkingID).map(prepareProperties)
  );

  return result;
}

exports.handler = async (event, context) => {
  try {
    const result = await listParkingSlots(event);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
