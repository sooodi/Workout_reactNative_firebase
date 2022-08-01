import firestore from '@react-native-firebase/firestore';

import store from '@store/store';

import {logger} from '@utility/helper/functionHelper';

import {stringHelper} from '@utility/helper/stringHelper';

class ResponseMessage {
  result: any;
  message: string;
  data: object;
}

class UserQueries {
  constructor() {
    this.types = {
      email: 'string',
      first_name: 'string',
      last_name: 'string',
      is_deleted: 'boolean',
      created_at: 'object',
      updated_at: 'object',
      birthday:'object',
      height:'number',
      weight:'number',
      targetWeight:'number',
      day_at_week:'number',
      bmi:'number',
      avatar:'string'
    };

    this.db = firestore().collection('users');
  }

  /**
   * @param {Object} documentObj
   * @param {String} typeOfUse > Should Be 'create' OR 'update'
   */
  checkDataTypes(documentObj, typeOfUse) {
    return new Promise((resolve, reject) => {
      if (typeOfUse === 'create') {
        const {email, first_name, last_name, id} = documentObj;
        if (
          typeof email === 'string' &&
          typeof first_name === 'string' &&
          typeof last_name === 'string' &&
          typeof id === 'string'
        ) {
          return resolve({
            id,
            email,
            first_name,
            last_name,
            is_deleted: false,
            created_at: new Date(),
            updated_at: new Date(),
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
            .where('email', '==', object.email)
            .get()
            .then((result) => {
              if (result.size === 0) {
                const {
                  id,
                  email,
                  first_name,
                  last_name,
                  is_deleted,
                  created_at,
                  updated_at,

                } = object;

                this.db
                  .doc(id)
                  .set(
                    {
                      email,
                      first_name,
                      last_name,
                      is_deleted,
                      created_at,
                      updated_at,
                      birthday:new Date(),
                      targetWeight:55,
                      weight:75,
                      height:170,
                      area_ids:'',
                      intensity_id:'',
                      day_at_week:2,
                    },
                    {merge: true},
                  )
                  .then(() => {
                    responseMessage.result = true;
                    responseMessage.message =
                      stringHelper.queryMessages.create.successful;
                    responseMessage.data = object;

                    resolve(responseMessage);
                  });
              } else {
                responseMessage.result = true;
                responseMessage.message =
                  stringHelper.queryMessages.create.exists;
                responseMessage.data = {
                  id: result.docs[0].id,
                  ...result.docs[0].data(),
                };
                resolve(responseMessage);
              }
            });
        })
        .catch((err) => {
          logger(err, 'UserQueries, create()');
          reject(err);
        });
    });
  }

  /**
   * @param {String} id
   */
  get(id) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();

      this.db
        .doc(id)
        .get()
        .then((result) => {
          if (result.exists && !result.data().is_deleted) {
            responseMessage.result = true;
            responseMessage.message = stringHelper.queryMessages.get.found;
            responseMessage.data = {id, ...result.data()};

            resolve(responseMessage);
          } else {
            responseMessage.result = false;
            responseMessage.message = stringHelper.queryMessages.get.notFound;
            responseMessage.data = {};

            resolve(responseMessage);
          }
        })
        .catch((err) => {
          logger(err, 'UserQueries, get()');
          reject(err);
        });
    });
  }

  /**
   * @param {Array} conditions
   * [{
   *  type: 'where', (Type can be: where, orderBy)
   *  params: {field: 'email', conditionType: '==', value: 'xxx'},
   * }]
   */
  find(conditions = []) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();
      let queryRef = this.db;

      // queryRef = queryRef.where('user_id', '==', this.user.id);

      for (const condition of conditions) {
        const {type, params} = condition;
        switch (type) {
          case 'where':
            queryRef = queryRef.where(
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
          if (result.size > 0) {
            responseMessage.result = true;
            responseMessage.message = stringHelper.queryMessages.get.found;
            const docs = result.docs.map((document) => {
              return {id: document.id, ...document.data()};
            });
            responseMessage.data = docs;
            resolve(responseMessage);
          } else {
            responseMessage.result = false;
            responseMessage.message = stringHelper.queryMessages.get.notFound;
            responseMessage.data = [];

            resolve(responseMessage);
          }
        })
        .catch((err) => {
          logger(err, 'UserQueries, find()');
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
            if (document.exists && !document.data().is_deleted) {
              docRef.update(updatedFields).then(() => {
                responseMessage.result = true;
                responseMessage.message =
                  stringHelper.queryMessages.update.successful(id);
                responseMessage.data = {};
                resolve(responseMessage);
              });
            } else {
              responseMessage.result = false;
              responseMessage.message =
                stringHelper.queryMessages.update.notExists(id);
              responseMessage.data = {};
              resolve(responseMessage);
            }
          });
        })
        .catch((err) => {
          logger(err, 'UserQueries, update()');
          reject(err);
        });
    });
  }

  /**
   * @param {String} id
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      const responseMessage = new ResponseMessage();

      const docRef = this.db.doc(id);
      docRef
        .get()
        .then((document) => {
          if (document.exists && !document.data().is_deleted) {
            docRef.update({is_deleted: true}).then(() => {
              responseMessage.result = true;
              responseMessage.message =
                stringHelper.queryMessages.delete.successful(id);
              responseMessage.data = {};

              resolve(responseMessage);
            });
          } else {
            responseMessage.result = false;
            responseMessage.message =
              stringHelper.queryMessages.delete.notExists(id);
            responseMessage.data = {};

            resolve(responseMessage);
          }
        })
        .catch((err) => {
          logger(err, 'UserQueries, delete()');
          reject(err);
        });
    });
  }
}

const userQueries = new UserQueries();

export default userQueries;
