import { SlotsState, Action } from '../../types';

const slotsReducer = (slots: SlotsState, action: Action) => {
  switch (action.type) {
    case 'SLOTS_FETCH_START':
        return {
          loading: true,
          items: []
        };

    case 'SLOTS_FETCH_END':
      return {
        loading: false,
        items: action.payload
      };

    default:
      return slots;
  }
};

export default slotsReducer;
