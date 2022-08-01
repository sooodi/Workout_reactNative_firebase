
import {GET_INTENSITY_LIST,SET_SELECTED_INTENSITY} from './type';
import intensityQueries from "./intensityQueries";
import { SET_SELECTED_AREAS_LIST } from "@store/area/type";

export const getIntensityList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      intensityQueries
        .find([{type: 'orderBy', params: {field: 'updated_at', value: 'desc'}}])
        .then((response) => {
          dispatch({
            type: GET_INTENSITY_LIST,
            payload: response.data,
          });
          resolve(response.data)
        }).catch((err) => {
        reject(err);
      });
    });
  };
};
export const selectIntensity = (messages) => {
  return {
    type: SET_SELECTED_INTENSITY,
    payload: messages,
  };
};
