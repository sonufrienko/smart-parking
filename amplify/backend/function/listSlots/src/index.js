const SLOTS = [{
  Device: 630,
  SlotNumber: 'A50',
  SlotStatus: 1
}, {
  Device: 631,
  SlotNumber: 'A51',
  SlotStatus: 0
}, {
  Device: 632,
  SlotNumber: 'A52',
  SlotStatus: 0
}, {
  Device: 633,
  SlotNumber: 'A53',
  SlotStatus: 1
}];

exports.handler = (event, context) => {
  const { typeName, fieldName, arguments: args, identity } = event;
  console.log(`typeName: ${typeName}, fieldName: ${fieldName}, args: ${JSON.stringify(args)}, identity: ${JSON.stringify(identity)}`);
  context.done(null, SLOTS);
};