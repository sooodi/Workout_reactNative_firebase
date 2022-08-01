import historyQueries from './historyQueries';
import {GET_HISTORY_LIST,NOT_COMPELETE_HISTORY_LIST} from './type';
import { logger } from "@utility/helper/functionHelper";


export const getHistoryList = (user) => {
  return (dispatch) => {

    return new Promise((resolve, reject) => {
     console.log(  "getHistoryList................",    user)
      historyQueries
        .find([
          {
            type: 'orderBy',
            params: {field: 'created_at', value: 'desc'}
          }
        ],user.id)
        .then((response) => {

          dispatch({
            type: GET_HISTORY_LIST,
            payload: response.data,
          });
          resolve(response.data)
        }).catch((err) => {

        logger(err, 'err lidy History()');
      });
    });
  };
};
export const notCompeleteHistory = () => {
  return {
    type: NOT_COMPELETE_HISTORY_LIST,
    payload: true,
  };
};

export const createHistory = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      historyQueries
        .create(data)
        .then((response) => {

          // dispatch({
          //   type: UPDATE_SESSIONS_LIST,
          //   payload: {...response, data: [response.data]},
          // });
          resolve(response.data);
        })
        .catch((err) => {
          logger(err, 'createHistory()');
        });
    });
  };
};

export const cancelWorkout = (id,updatedObj) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("updatedObj",updatedObj)
      historyQueries.update(id, updatedObj).then((response) => {
        if (response.result) {

          resolve(true);
        }
      }) .catch(err => {
        reject(err);
      });
    });
  };
};
