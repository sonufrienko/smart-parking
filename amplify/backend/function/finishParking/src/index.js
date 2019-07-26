const { invoiceService } = require('/opt/shared');

const getInvoiceProps = item => ({
  Id: item.SK,
  UserID: item.UserID,
  PlateNumber: item.PlateNumber,
  DateFrom: item.DateFrom,
  DateTo: item.DateTo,
  Price: item.Price
});

const finishParking = async ({ UserID, InvoiceID }) => {
  const { Items: [invoice] } = await invoiceService.finishParking({ invoiceID: InvoiceID, userID: UserID });
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