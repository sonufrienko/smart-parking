const { slotService } = require('shared');

const getSlotProps = item => ({
  Id: item.PK,
  Device: item.Device,
  SlotNumber: item.SlotNumber,
  SlotStatus: item.SlotStatus
});

const updateSlotStatus = async ({ Device, SlotStatus }) => {
  const { Item } = await slotService.setStatus({ device: Device, slotStatus: SlotStatus });
  return getSlotProps(Item);
};

exports.handler = async (event, context) => {
  try {
    const slot = await updateSlotStatus(event.arguments.input);
    context.done(null, slot);
  } catch (err) {
    context.done(err, null);
  }
};
