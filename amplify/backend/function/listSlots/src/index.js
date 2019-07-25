const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const PARKING_TABLE = 'Parking';

const getSlotNumber = slot => Number(slot.SlotNumber.slice(1));

const sortBySlotNumber = (a, b) =>
  getSlotNumber(a) > getSlotNumber(b) ? 1 : getSlotNumber(b) > getSlotNumber(a) ? -1 : 0;

const getSlotProps = slot => ({
  Id: slot.PK,
  Device: slot.Device,
  SlotNumber: slot.SlotNumber,
  SlotStatus: slot.SlotStatus
});

exports.handler = (event, context) => {
  const { typeName, fieldName, arguments: args, identity } = event;

  const params = {
    TableName: PARKING_TABLE,
    IndexName: 'SKIndex',
    KeyConditionExpression: 'SK = :sk',
    ExpressionAttributeValues: { ':sk': 'slot' },
    Limit: 1000
  };

  client
    .query(params)
    .promise()
    .then(({ Items }) => {
      const slots = Items.sort(sortBySlotNumber).map(getSlotProps);
      context.done(null, slots);
    })
    .catch(err => {
      console.log(err);
      context.done(err, null);
    });
};
