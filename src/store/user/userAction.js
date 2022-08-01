import auth from '@react-native-firebase/auth';

import userQueries from './userQueries';
import { firestoreErrorHandler, logger, showAlert } from "@utility/helper/functionHelper";


import {SET_USER_DATA,UPDATE_USER_DATA} from './type';
import { stringHelper } from "@utility/helper/stringHelper";

export const userLogin = (email, password) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          const {metadata, email, displayName, uid} = user._user;

          userQueries
            .find([
              {
                type: 'where',
                params: {field: 'email', conditionType: '==', value: email},
              },
            ])
            .then(response => {
              if (response.result === true) {
                dispatch(setUserData(response.data[0]));

                resolve();
              }
            });
        })
        .catch(err => {
          reject(firestoreErrorHandler(err));
        });
    });
  };
};

export const userSignUp = (email, password, displayName) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
          const {metadata, email, uid} = user._user;
          // Update user profile in Authentication service
          await user.updateProfile({displayName});

          // Create a user document in FireStore DB
          const userData = {
            id: uid,
            first_name: displayName.split(' ')[0],
            last_name: '',
            email,
          };

          if (displayName.split(' ').length > 1) {
            userData.last_name = displayName.split(' ')[1];
          }

          userQueries
            .create(userData)
            .then(response => {
              resolve();
            })
            .catch(err => {
              logger(err, 'userSignUp()');
            });
        })
        .catch(err => {
          reject(firestoreErrorHandler(err));
        });
    });
  };
};

export const userForgotPassword = email => {
  return () => {
    return new Promise((resolve, reject) => {
      auth()
        .sendPasswordResetEmail(email)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(firestoreErrorHandler(err));
        });
    });
  };
};

export const userUpdateEmailPassword = (email, password, displayName) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      auth()
        .currentUser.updateEmail(email)
        .then(() => {
          console.log('email update');
          auth()
            .currentUser.updatePassword(password)
            .then(async () => {
              console.log('password update');
              const {uid} = auth().currentUser._user;
              await auth().currentUser.updateProfile({displayName});

              // Create a user document in FireStore DB
              const userData = {
                id: uid,
                first_name: displayName.split(' ')[0],
                last_name: '',
                email,
              };

              if (displayName.split(' ').length > 1) {
                userData.last_name = displayName.split(' ')[1];
              }

              userQueries
                .create(userData)
                .then(response => {
                  console.log('password update', response);
                  dispatch(setUserData(response.data));

                  resolve();
                })
                .catch(err => {
                  logger(err, 'user update');
                });
            })
            .catch(err => {
              reject(firestoreErrorHandler(err));
            });
        });
    });
  };
};
export const updateProfile = (id,updatedProfileObj) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      userQueries.update(id, updatedProfileObj).then((response) => {
        if (response.result) {
          dispatch({
            type: UPDATE_USER_DATA,
            payload: updatedProfileObj,
          });

          resolve("true");
        }
      }) .catch(err => {
        reject(err);
      });
    });
  };
};
export const userLogout = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch(err => {
          reject(firestoreErrorHandler(err));
        });
    });
  };
};

export const setUserData = data => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};
