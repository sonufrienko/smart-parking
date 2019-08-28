const { invoiceService } = require('shared');

const getInvoiceProps = invoices => invoices.map((item) => ({
  Id: item.SK.replace('inv#', ''),
  UserID: item.UserID,
  SlotID: item.SlotID,
  PlateNumber: item.PlateNumber,
  DateFrom: String(item.DateFrom || ''),
  DateTo: String(item.DateTo || ''),
  Price: item.Price
}));

const listInvoices = async ({ userID }) => {
  const invoices = await invoiceService.listInvoices({ userID });
  return getInvoiceProps(invoices);
};

exports.handler = async (event, context) => {
  try {
    // get AWS Cognito user ID
    const userID = event.identity.sub;
    const invoices = await listInvoices({ userID });
    context.done(null, invoices);
  } catch (err) {
    context.done(err, null);
  }
};