import firestore from '@react-native-firebase/firestore';

import store from '@store/store';

import {logger} from '@utility/helper/functionHelper';

import {stringHelper} from '@utility/helper/stringHelper';

class ResponseMessage {
  result: any;
  message: string;
  data: object;
}

class AreaQueries {
  constructor() {
    this.types = {
      name: 'string',
    };

    this.db = firestore().collection('Area');
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
const areaQueries = new AreaQueries();

export default areaQueries;
