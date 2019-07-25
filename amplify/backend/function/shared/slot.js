const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const PARKING_TABLE = 'Parking';

const getAll = ({ limit = 1000 }) => {
  const params = {
    TableName: PARKING_TABLE,
    IndexName: 'SKIndex',
    KeyConditionExpression: 'SK = :sk',
    ExpressionAttributeValues: { ':sk': 'slot' },
    Limit: limit
  };

  return client.query(params).promise();
};

const getBySlotNumber = ({ slotNumber }) => {
  const params = {
    TableName: PARKING_TABLE,
    IndexName: 'SlotNumberIndex',
    KeyConditionExpression: 'SlotNumber = :slotNumber',
    ExpressionAttributeValues: {
      ':slotNumber': slotNumber
    }
  };

  return client.query(params).promise();
};

const getByDevice = ({ device }) => {
  const params = {
    TableName: PARKING_TABLE,
    IndexName: 'DeviceIndex',
    KeyConditionExpression: 'Device = :device',
    ExpressionAttributeValues: {
      ':device': device
    }
  };

  return client.query(params).promise();
};

const updateSlotStatus = ({ slotPK, slotStatus }) => {
  const params = {
    TableName: PARKING_TABLE,
    Key: {
      PK: slotPK,
      SK: 'slot'
    },
    UpdateExpression: 'set SlotStatus = :slotStatus',
    ExpressionAttributeValues: {
      ':slotStatus': slotStatus
    }
  };

  return client.update(params).promise();
};

const setStatus = async ({ device, slotStatus }) => {
  const { Items } = await getByDevice({ device });
  if (!Items || !Items.length) {
    throw new Error(`Device ${device} not exists.`);
  }

  const [{ PK: slotPK }] = Items;

  await updateSlotStatus({ slotPK, slotStatus });
};

module.exports = {
  getAll,
  setStatus,
  getBySlotNumber
};
