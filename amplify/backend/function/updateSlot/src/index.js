const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
const DYNAMODB_TABLE = 'Parking';

const prepareProperties = item => ({
  parkingID: item.parkingID,
  slotNumber: item.slotNumber,
  slotStatus: item.slotStatus,
  device: item.device
});

const getSlotNumber = async ({ parkingID, device }) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    IndexName: 'parkingDeviceIndex',
    KeyConditionExpression: 'parkingID = :parkingID AND device = :device',
    ExpressionAttributeValues: {
      ':parkingID': parkingID,
      ':device': device
    },
    ProjectionExpression: 'slotNumber'
  };

  const { Items } = await db.query(params).promise();
  if (Items && Items.length) {
    const [ { slotNumber } ] = Items;
    return slotNumber;
  }
  
  return null;
}

const updateSlotStatus = ({ parkingID, slotNumber, slotStatus }) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      parkingID,
      slotNumber
    },
    UpdateExpression: 'set slotStatus = :slotStatus',
    ExpressionAttributeValues: {
      ':slotStatus': slotStatus
    },
    ReturnValues: 'ALL_NEW'
  };

  return db.update(params).promise();
};

const updateSlot = async ({ parkingID, device, slotStatus }) => {
  const slotNumber = await getSlotNumber({ parkingID, device });
  if (slotNumber) {
    const { Attributes: slot } = await updateSlotStatus({ parkingID, slotNumber, slotStatus });
    return prepareProperties(slot);
  }

  return null;
};

exports.handler = async (event, context) => {
  try {
    const result = await updateSlot(event.arguments.input);
    context.done(null, result);
  } catch (err) {
    context.done(err, null);
  }
};
