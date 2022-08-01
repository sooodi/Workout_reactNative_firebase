import firestore from '@react-native-firebase/firestore';

import {logger} from '@utility/helper/functionHelper';
import {stringHelper} from '@utility/helper/stringHelper';
import store from "@store/store";

class ResponseMessage {
  result: any;
  message: string;
  data: object;
}

class ExerciseQueries {
  constructor() {
    this.types = {
      Calories: 'number',//kcal
      area_id: 'string',
      intensity_id: 'string',
      duration: 'number',//minute
    };

    this.db = firestore().collection('Exercise');//get table
  }

  findById(excersiseId) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();

      const queryRef = this.db.doc(excersiseId);

      queryRef
        .get()
        .then((result) => {

          responseMessage.result = true;

          if (result) {
            responseMessage.message = stringHelper.queryMessages.get.found;
            responseMessage.data = { id: result.id, ...result.data() };
            resolve(responseMessage);
          } else {
            responseMessage.message = stringHelper.queryMessages.get.notFound;
            responseMessage.data = [];

            resolve(responseMessage);
          }
        })
        .catch((err) => {
          logger(err, 'excer Queries, find()');
          reject(err);
        });
    });

  }

  findByIds(excersiseIds) {

    return new Promise((resolve,reject) => {

      const responseMessage = new ResponseMessage();

      let queryRef = this.db;

      const getDocs = excersiseIds.map((id: string) => {
        return queryRef. doc(id).get()
          .then((document) => {

            if (document.exists && !document.data().is_canceled) {
              return { id: document.id, ...document.data() };
            }
          }) .catch((err) => {
            logger(err, 'history Queries,not  find()');
            reject(err);
          });
      });
      Promise.all(getDocs).then((docs) => {
        if (docs.length > 0) {

          responseMessage.result = true;
          responseMessage.message = stringHelper.queryMessages.get.found;
          responseMessage.data =docs;
          resolve(responseMessage);
        } else {
          responseMessage.message = stringHelper.queryMessages.get.notFound;
          responseMessage.data = [];
          resolve(responseMessage);
        }
        logger(docs.length, 'getDocs, find()');
      });


    });
  }

  /**
   * @param {Array} conditions
   * [{
   *  type: 'where', (Type can be: where, orderBy)
   *  params: {field: 'email', conditionType: '==', value: ''},
   * }]
   */
  find(conditions = []) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();
      let queryRef = this.db;

      for (const condition of conditions) {
        const { params } = condition;
        queryRef = queryRef.where(
          params.field,
          params.conditionType,
          params.value
        );
      }
      queryRef
        .get()
        .then((result) => {
          responseMessage.result = true;
          if (result.size > 0) {
            responseMessage.message = stringHelper.queryMessages.get.found;
            const docs = result.docs.map((document) => {
              return { id: document.id, ...document.data() };
            });
            responseMessage.data = docs;

            resolve(responseMessage);
          } else {
            responseMessage.message = stringHelper.queryMessages.get.notFound;
            responseMessage.data = [];
            console.log("fff",responseMessage.message)
            resolve(responseMessage);
          }
        })
        .catch((err) => {
          logger(err, 'SessionQueries, find()');
          reject(err);
        });
    });
  }
}
const exerciseQueries = new ExerciseQueries();

export default exerciseQueries;
