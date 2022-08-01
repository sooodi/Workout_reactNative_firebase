import firestore from '@react-native-firebase/firestore';

import {logger} from '@utility/helper/functionHelper';
import {stringHelper} from '@utility/helper/stringHelper';

class ResponseMessage {
  result: any;
  message: string;
  data: object;
}

class ExerciseQueries {
  constructor() {
    this.types = {
      exercises_id: 'object',
      user_id: 'string',
      intensity_id: 'string',
      created_at: 'object',//min
      day_at_week: 'number',
      total_calories: 'number',
      is_canceled: 'boolean',
      is_complete: 'boolean'
    };

    this.db = firestore().collection('History');
  }

  /**
   * @param {Object} documentObj
   * @param {String} typeOfUse > Should Be 'create' OR 'update'
   */
  checkDataTypes(documentObj, typeOfUse) {
    return new Promise((resolve, reject) => {
      if (typeOfUse === 'create') {
        const { exercises_id, user_id, intensity_id, total_calories, day_at_week } = documentObj;
        if (
          typeof exercises_id === 'object' &&
          typeof user_id === 'string' &&
          typeof intensity_id === 'string'

        ) {
          return resolve({
            exercises_id: exercises_id,
            user_id,
            intensity_id,
            total_calories,
            created_at: new Date(),
            day_at_week,
            is_canceled: false,
            is_complete: false
          });
        } else {
          reject('"documentObj" properties did not have valid types.');
        }
      } else if (typeOfUse === 'update') {
        const errors = [];
        Object.keys(documentObj).forEach((property) => {
          if (typeof documentObj[property] !== this.types[property]) {
            errors.push(
              `Type of "${property}" must be "${this.types[property]}".`,
            );
          }
        });
        if (errors.length > 0) {
          reject(errors.join(' '));
        } else {
          resolve({
            ...documentObj,
            updated_at: new Date(),
          });
        }
      }
    });
  }

  /**
   * @param {Object} document
   */
  create(document) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();

      return this.checkDataTypes(document, 'create')
        .then((object) => {
          this.db
            .add(object)
            .then((newDocument) => {
              newDocument.get().then((newDocumentData) => {
                responseMessage.result = true;
                responseMessage.message =
                  stringHelper.queryMessages.create.successful;
                responseMessage.data = {
                  id: newDocument.id,
                  ...newDocumentData.data(),
                };

                resolve(responseMessage);
              });
            })
            .catch((err) => {
              logger(err, 'historyQueries, create()');
              reject(err);
            });
        })
        .catch((err) => {
          logger(err, 'historyQueries, create()');
          reject(err);
        });
    });
  }

  /**
   * @param {Array} conditions
   * [{
   *  type: 'where', (Type can be: where, orderBy)

   * }]
   */
  find(conditions = [],userId) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();
      let queryRef = this.db;

      for (const condition of conditions) {
        const { type, params } = condition;
        switch (type) {
          case 'where':
            queryRef =queryRef.where(
              params.field,
              params.conditionType,
              params.value,
            );
            break;

          case 'orderBy':
            queryRef = queryRef.orderBy(params.field, params.value);
            break;

          default:
            break;
        }
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
            const docs2 = docs.filter((e) => e.user_id===userId)

            console.log("document.data()",JSON.stringify(docs2))
            responseMessage.data = docs2;
            resolve(responseMessage);
          } else {
            responseMessage.message = stringHelper.queryMessages.get.notFound;
            responseMessage.data = [];
            resolve(responseMessage);
          }
        })
        .catch((err) => {
          logger(err, 'SessionQueries, find()');
          reject(err);
        });
    });
  }
  /**
   * @param {String} id
   * @param {Object} updatedFields
   */
  update(id, updatedFields) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();

      this.checkDataTypes(updatedFields, 'update')
        .then((object) => {
          const docRef = this.db.doc(id);
          docRef.get().then((document) => {
            if (document.exists && !document.data().is_canceled) {
              docRef.update(updatedFields).then(() => {
                responseMessage.result = true;
                responseMessage.message =
                  stringHelper.queryMessages.update.successful(id);
                responseMessage.data = {};

                resolve(responseMessage);
              });
            } else {
              responseMessage.result = true;
              responseMessage.message =
                stringHelper.queryMessages.update.notExists(id);
              responseMessage.data = {};

              resolve(responseMessage);
            }
          });
        })
        .catch((err) => {
          logger(err, 'history Queries, update()');
          reject(err);
        });
    });
  }

  /**
   * @param {Object} document
   */


}
const exerciseQueries = new ExerciseQueries();

export default exerciseQueries;
