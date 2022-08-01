import {
  GET_INTENSITY_LIST,
  SET_SELECTED_INTENSITY
} from './type';

const INITIAL_STATE = {
  intensityList: [],
  intensityData: {
    id: null,
    name: '',
  },
  loading: true,
};

const intensityReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;

  switch (action.type) {
    case GET_INTENSITY_LIST:
      return {
        ...state,
        intensityList: payload,
      };
    case SET_SELECTED_INTENSITY:
      console.log("SET_SELECTED_INTENSITY",payload)
      return {
        ...state,
        intensityData: payload,
      };
    default:
      return {...state, loading: false};
  }
};

export default intensityReducer;
