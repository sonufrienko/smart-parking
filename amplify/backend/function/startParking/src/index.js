const { invoiceService } = require('/opt/shared');

const getInvoiceProps = item => ({
  Id: item.SK,
  UserID: item.UserID,
  PlateNumber: item.PlateNumber,
  DateFrom: item.DateFrom,
  DateTo: item.DateTo,
  Price: item.Price
});

const startParking = async ({ UserID, PlateNumber, SlotNumber }) => {
  const { Items: [invoice] } = await invoiceService.startParking({ slotNumber: SlotNumber, userID: UserID, plateNumber: PlateNumber });
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