import { StateInterface, Action, ActionType } from '../types';

const reducer = (state: StateInterface, action: Action) => {
  switch (action.type) {
    case ActionType.PARKING_FETCH_START:
      const { parkingList } = state;
      return {
        ...state,
        parkingList: {
          ...parkingList,
          loading: true
        }
      };

    case ActionType.PARKING_FETCH_END:
      return {
        ...state,
        parkingList: {
          loading: false,
          items: action.payload
        }
      };

    default:
      return state;
  }
};

export default reducer;
