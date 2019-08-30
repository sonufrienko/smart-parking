const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const PARKING_INFO_TABLE = 'ParkingInfo';

const fetchParkingInfoByID = ({ ID }) => {
  const params = {
    TableName : PARKING_INFO_TABLE,
    Key: {
      ID: ID
    }
  };

  return client.get(params).promise();
};

const prepareData = item => ({
  ID: item.ID,
  Title: item.Title,
  Rate: item.Rate,
  Address: item.Address,
  Location: item.Location,
  Features: item.Features,
  OpeningHours: item.OpeningHours
});

const getParkingInfo = async ({ ID }) => {
  const { Item } = await fetchParkingInfoByID({ ID });
  return prepareData(Item);
};

exports.handler = async (event, context) => {
  try {
    const info = await getParkingInfo(event.arguments);
    context.done(null, info);
  } catch (err) {
    context.done(err, null);
  }
};
