import { InvoiceState, InvoicesState, Action } from '../../types';

const invoicesReducer = (invoices: InvoicesState, action: Action): InvoicesState => {
  switch (action.type) {
    case 'START_PARKING':
      const newInvoices: InvoicesState = new Map<string, InvoiceState>(invoices);
      newInvoices.set(action.payload.SlotID, action.payload);
      return newInvoices;

    case 'FINISH_PARKING':
      const invoicesAfterFinish: InvoicesState = new Map<string, InvoiceState>(invoices);
      invoicesAfterFinish.delete(action.payload.SlotID);      
      return invoicesAfterFinish;

    default:
      return invoices;
  }
};

export default invoicesReducer;
