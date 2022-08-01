import navigationService from '@navigation/navigationService';
import {Colors} from '@utility/constants/Colors';
import {stringHelper} from '@utility/helper/stringHelper';

const ALL_QUESTION = 'http://google.com';
const request_fail = 'auth/network-request-failed';
const auth_fail = 'auth/-';
const auth_weakpassword_fail = 'auth/weak-password';
const auth_user_fail = 'auth/user-not-found';
const unkown_fail = 'auth/unkown';
const password_fail = 'auth/wrong-password';
const email_dont_uniq_fail = 'auth/email-already-in-use';
const user_not_found_fail = 'auth/user-not-found';
import moment from 'moment';

export const getColorCode = colorId => {
  return colorId === undefined ? 1 : Colors.arrayColorPart[colorId];
};
export const calculateAge = (dob,fromFirebase) => {
  let birthDate ;
  let difference
  if(fromFirebase) {
    birthDate = moment(
      new Date(
        dob.seconds * 1000 +
        dob.nanoseconds / 1000000,
      ).getTime())
    difference = Date.now() - birthDate;

  }
  else
  {
    const birthDate = new Date(dob);
    difference = Date.now() - birthDate.getTime();
  }

  const age = new Date(difference);
  console.log("age....",age)
  return Math.abs(age.getUTCFullYear() - 1970);

  // return age_now;
}
export const getIndexColorId = partList => {
  if (partList.findIndex(e => e.color_id === 1) === -1) {
    return 1;
  } else if (partList.findIndex(e => e.color_id === 2) === -1) {
    return 2;
  } else if (partList.findIndex(e => e.color_id === 3) === -1) {
    return 3;
  } else if (partList.findIndex(e => e.color_id === 4) === -1) {
    return 4;
  } else if (partList.findIndex(e => e.color_id === 5) === -1) {
    return 5;
  }

  return -1;
};

export const addZeroToDigit = digit => {
  let strDigit = digit;
  if (strDigit.toString().length < 2) {
    strDigit = '0' + strDigit.toString();
  }

  return strDigit;
};
export const getNameFromDB=(arr,selectedId) => {

  let arrSel= arr.filter((e) => {
    return  e.id===selectedId
  })
  if(arrSel.length>0)
  return arrSel[0].name
  else
    return ""
}
export const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text) !== false;
};

export const getDateTimeFormat = date => {
  let dateval = date;

  if (dateval === '') {
    return '';
  }

  let dateStr =
    dateval.getFullYear() +
    '-' +
    addZeroToDigit(dateval.getMonth() + 1) +
    '-' +
    addZeroToDigit(dateval.getDate());

  let timeStr =
    addZeroToDigit(dateval.getHours()) +
    ':' +
    addZeroToDigit(dateval.getMinutes());
  return dateStr + '  ' + timeStr;
};

export const splitName = nameStr => {
  let objName = {
    firstName: nameStr,
    lastName: '',
  };
  if (nameStr.length > 0) {
    let index = nameStr.indexOf(' '); // Gets the first index where a space occours

    if (index !== -1) {
      return {
        firstName: nameStr.substr(0, index),
        lastName: nameStr.substr(index + 1),
      };
    } else {
      return objName;
    }
  }

  return objName;
};

//maybe need
export const formatNames = item => {
  let heroName = item.name.charAt(14).toUpperCase() + item.name.slice(15);
  heroName = heroName.replace(/_/g, ' ');
  return heroName;
};

export const logger = (value, title = 'No title') => {
  if (__DEV__) {
    console.log(
      ` \n \n \n \n ~~~~~~~~~~~~~~+++++||||   ${title}   ||||+++++~~~~~~~~~~~~~~~~~~~~  \n \n \n \n`,
    );
    console.log(value);
    console.log(
      ' \n \n \n \n ~~~~~~~~~~~~~~+++++|||||||||||||||||||||+++++~~~~~~~~~~~~~~~~~~~~  \n \n \n \n',
    );
  }
};
export const showAlert = bodyStr => {
  navigationService.navigate('Modal', {
    mode: 'modal',
    modalProps: {
      data: {
        dialogStyle: {
          marginBottom: 0,
        },
        body: bodyStr,
        title: '',
        inputShow: false,
        textData: '',
        isEdit: false,
        placeHolder: 'rrrr',
        notValidStr: 'oops',
        multiline: false,
        isDelete: false,
        isAlert: true,
      },
      accept: () => {},
    },
  });
};
export const firestoreErrorHandler = (errorMessage = '') => {
  if (
    errorMessage.code === auth_fail ||
    errorMessage.code === request_fail ||
    errorMessage.code === unkown_fail
  ) {
    return stringHelper.auth.conectionErr;
  } else if (errorMessage.code === auth_weakpassword_fail) {
    return errorMessage.message.substring(21, errorMessage.message.length);
  } else if (errorMessage.code === email_dont_uniq_fail) {
    return errorMessage.message.substring(27, errorMessage.message.length);
  } else if (
    errorMessage.code === password_fail ||
    auth_user_fail ||
    user_not_found_fail
  ) {
    return errorMessage.message.substring(21, errorMessage.message.length);
  } else {
    return errorMessage.message;
  }
};

export const delay = time => {
  return new Promise(resolve => setTimeout(() => resolve(), time * 1000));
};
