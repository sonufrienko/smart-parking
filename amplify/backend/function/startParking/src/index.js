const { invoiceService } = require('shared');

const getInvoiceProps = item => ({
  Id: item.SK.replace('inv#', ''),
  UserID: item.UserID,
  SlotID: item.SlotID,
  PlateNumber: item.PlateNumber,
  DateFrom: String(item.DateFrom || ''),
  DateTo: String(item.DateTo || ''),
  Price: item.Price
});

const startParking = async ({ UserID, PlateNumber, SlotNumber }) => {
  const invoice = await invoiceService.startParking({ slotNumber: SlotNumber, userID: UserID, plateNumber: PlateNumber });
  return getInvoiceProps(invoice);
};

exports.handler = async (event, context) => {
  try {
    const invoice = await startParking(event.arguments.input);
    context.done(null, invoice);
  } catch (err) {
    context.done(err, null);
  }
};