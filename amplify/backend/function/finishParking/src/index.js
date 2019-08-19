const { invoiceService } = require('/opt/shared');

const getInvoiceProps = item => ({
  Id: item.SK.replace('inv#', ''),
  UserID: item.UserID,
  SlotID: item.SlotID,
  PlateNumber: item.PlateNumber,
  DateFrom: String(item.DateFrom || ''),
  DateTo: String(item.DateTo || ''),
  Price: item.Price
});

const finishParking = async ({ UserID, InvoiceID }) => {
  const invoice = await invoiceService.finishParking({ invoiceID: InvoiceID, userID: UserID });
  return getInvoiceProps(invoice);
};

exports.handler = async (event, context) => {
  try {
    const invoice = await finishParking(event.arguments.input);
    context.done(null, invoice);
  } catch (err) {
    context.done(err, null);
  }
};