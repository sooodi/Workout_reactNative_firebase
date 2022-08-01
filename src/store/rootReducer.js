import {combineReducers} from 'redux';

import userReducer from '@store/user/userReducer';
import areaReducer from "@store/area/areaReducer";
import intensityReducer from "@store/Intensity/intensityReducer";
import exerciseReducer from "@store/exercise/exerciseReducer";
import historyReducer from "@store/history/historyReducer";

const rootReducer = combineReducers({
  user: userReducer,
  area:areaReducer,
  exercise:exerciseReducer,
  history:historyReducer,
  intens:intensityReducer,
});

export default rootReducer;
