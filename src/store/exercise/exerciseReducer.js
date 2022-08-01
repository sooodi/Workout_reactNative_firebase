import {
  GET_EXERCISE_LIST,
} from './type';

const INITIAL_STATE = {
  exerciseList: [],
  exerciseData: {
    id: null,
    name: '',
  },
  loading: true,
};

const exerciseReducer = (state = INITIAL_STATE, action) => {
  const {payload} = action;

  switch (action.type) {
    case GET_EXERCISE_LIST:
      return {
        ...state,
        exerciseList: payload,
      };

    default:
      return {...state, loading: false};
  }
};

export default exerciseReducer;
