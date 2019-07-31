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

    case 'SLOT_STATUS_CHANGED':
      const newItem = action.payload;
      const { items } = slots;
      const updatedItems = [...(items || []).map(item => item.Id === newItem.Id ? ({
          ...item,
          SlotStatus: newItem.SlotStatus
        }) : item
      )];

      return {
        loading: false,
        items: updatedItems
      };

    default:
      return slots;
  }
};

export default slotsReducer;
