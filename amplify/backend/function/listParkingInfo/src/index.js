const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const PARKING_INFO_TABLE = 'ParkingInfo';

const fetchAllParkingInfo = () => {
  const limit = 1000;
  const params = {
    TableName: PARKING_INFO_TABLE,
    Limit: limit
  };

  return client.scan(params).promise();
};

const prepareData = items => items.map(item => ({
  ID: item.ID,
  Title: item.Title,
  Rate: item.Rate,
  Address: item.Address,
  Location: item.Location,
  Features: item.Features,
  OpeningHours: item.OpeningHours
}));

const listParkingInfo = async () => {
  const { Items } = await fetchAllParkingInfo();
  return prepareData(Items);
};

exports.handler = async (event, context) => {
  try {
    const list = await listParkingInfo(event.arguments.input);
    context.done(null, list);
  } catch (err) {
    context.done(err, null);
  }
};
