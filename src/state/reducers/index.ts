import { StateInterface, Action } from '../../types';
import slotsReducer from './slots';

const mainReducer = ({ slots }: StateInterface, action: Action) => ({
  slots: slotsReducer(slots, action)
});

export default mainReducer;