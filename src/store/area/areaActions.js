import areaQueries from './areaQueries';
import {GET_AREAS_LIST,SET_SELECTED_AREAS_LIST} from './type';

export const getAreasList = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      areaQueries
        .find([{type: 'orderBy', params: { value: 'desc'}}])
        .then((response) => {
          dispatch({
            type: GET_AREAS_LIST,
            payload: response.data,
          });
          resolve(response.data)
        }).catch((err) => {
        reject(err);
      });
    });
  };
};
export const addAreasToSelectedList = (messages) => {
  return {
    type: SET_SELECTED_AREAS_LIST,
    payload: messages,
  };
};
