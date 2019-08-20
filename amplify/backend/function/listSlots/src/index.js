const { slotService } = require('shared');

const getSlotNumber = item => Number(item.SlotNumber.slice(1));

const sortBySlotNumber = (a, b) =>
  getSlotNumber(a) > getSlotNumber(b) ? 1 : getSlotNumber(b) > getSlotNumber(a) ? -1 : 0;

const getSlotProps = item => ({
  Id: item.PK,
  Device: item.Device,
  SlotNumber: item.SlotNumber,
  SlotStatus: item.SlotStatus
});

const listSlots = async () => {
  const { Items } = await slotService.getAll({ limit: 100 });
  return Items.sort(sortBySlotNumber).map(getSlotProps);
};

exports.handler = async (event, context) => {
  try {
    const slots = await listSlots();
    context.done(null, slots);
  } catch (err) {
    context.done(err, null);
  }
};
