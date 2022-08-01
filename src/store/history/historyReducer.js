import {
  GET_HISTORY_LIST,
  NOT_COMPELETE_HISTORY_LIST
} from './type';

const INITIAL_STATE = {
  historyList: [],
  loading: true,
  hasLastWorkout:false
};

const historyReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;

  switch (action.type) {
    case GET_HISTORY_LIST:
      return {
        ...state,
        historyList: payload,
      };
    case   NOT_COMPELETE_HISTORY_LIST:

      return {
        ...state,
        hasLastWorkout: payload,
      };
    default:
      return {...state, loading: false};
  }
};

export default historyReducer;
