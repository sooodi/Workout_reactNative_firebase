import {
  SET_SELECTED_AREAS_LIST,
  GET_AREAS_LIST,
} from './type';

const INITIAL_STATE = {
  areaList: [],
  areaSelectedList:[],
  areaData: {
    id: null,
    name: '',
  },
  loading: true,
};

const areaReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;

  switch (action.type) {
    case GET_AREAS_LIST:
      return {
        ...state,
        areaList: payload,
      };
    case SET_SELECTED_AREAS_LIST:

      console.log("SET_SELECTED_AREAS_LIST",payload)
      return {
        ...state,
        areaSelectedList: [...payload],
      };

    default:
      return {...state, loading: false};
  }
};

export default areaReducer;
