import areaQueries from './exerciseQueries';
import {GET_EXERCISE_LIST} from './type';
import intensityQueries from "./exerciseQueries";
import exerciseQueries from "./exerciseQueries";
import { createHistory } from "@store/history/historyActions";

export const getExerciseList = (intensityId,areaIds) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log("intensityId ",intensityId)
      exerciseQueries
        .find([
          {type: 'where', params: {field: 'area_id', conditionType: 'in',value:areaIds}},
          {type: 'where',  params: {field: 'intensity_id',conditionType: '==', value:intensityId} }
        ])
        .then((response) => {

          dispatch({
            type: GET_EXERCISE_LIST,
            payload: response.data,
          });
          resolve(response.data)
        });

    });
  };
};

export const getExerciseListByIDS = (excersiseIds) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log("exercises_id ",excersiseIds)
      exerciseQueries
        .findByIds(excersiseIds)
        .then((response) => {
           console.log("getExerciseListByIDS",JSON.stringify(response))
          dispatch({
            type: GET_EXERCISE_LIST,
            payload: response.data,
          });
          resolve(response.data)
        });

    });
  };
};
export const getExerciseById = (excersiseId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      exerciseQueries
       // .findById([{type: 'where', params: {field: 'exercises_id', conditionType: 'in',value:excersiseId}}])
        .findById(excersiseId)
        .then((response) => {
         console.log("getExerciseList")
          resolve(response.data)
        }).catch((err) => {
        reject(null);
      });

    });
  };
};

