import { StateInterface, Action } from '../../types';
import slotsReducer from './slots';
import invoicesReducer from './invoices';

const mainReducer = ({ slots, invoices }: StateInterface, action: Action) => ({
  slots: slotsReducer(slots, action),
  invoices: invoicesReducer(invoices, action)
});

export default mainReducer;