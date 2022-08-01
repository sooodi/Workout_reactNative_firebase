import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Button, Input} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import navigationService from '@navigation/navigationService';

import {stringHelper} from '@utility/helper/stringHelper';
import {valueConstant} from '@utility/constants/valueConstant';
import {Colors} from '@utility/constants/Colors';

const INPUT_HEIGHT_EDIT = 82;
const INPUT_HEIGHT_NOEDIT = 36;

const DialogAlertCustom = props => {
  const {
    isEdit,
    body,
    title,
    dialogStyle,
    inputShow,
    isDelete,
    textData,
    isAlert,
    placeHolder,
    multiline,
    titleButton,
  } = props.data;

  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();
  const [inputTxt, setInputTxt] = useState(
    textData !== undefined ? textData.message : 'e',
  );

  const doAction = () => {

  };

  return (
    <View style={[styles.view, dialogStyle]}>
      <View
        style={[
          styles.modalStyle,
          {
            height: 180,
          },
        ]}>
        {isAlert === undefined ? (
          <Text
            style={[
              styles.titleTxt,
              {
                marginTop: title === '' ? 0 : 14,
                marginBottom: title === '' ? 0 : 8,
              },
            ]}>
            {title}
          </Text>
        ) : (
          <View style={styles.emptyView} />
        )}
        <Text style={[styles.bodyText, {marginBottom: title === '' ? 8 : 0}]}>
          {body}
        </Text>

        <View style={styles.lineHorizontal} />
        <View style={styles.buttonRow}>
          <Button
            onPress={() => navigationService.back()}
            type="clear"
            containerStyle={styles.view}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            title={stringHelper.cancelBut}
          />
          {isAlert === undefined && <View style={styles.lineView} />}
          {isAlert === undefined && (
            <Button
              onPress={() => doAction()}
              type="clear"
              containerStyle={styles.view}
              buttonStyle={styles.buttonStyle}
              titleStyle={[styles.buttonTitle, styles.boldFontStyle]}
              title={titleButton}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderColor: '#3c3c3c',
    borderWidth: 0,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveScreenWidth(83),
  },
  boldFontStyle: {
    fontWeight: 'bold',
  },
  view: {
    alignItems: 'center',
  },
  buttonStyle: {
    width: 142,
    borderRadius: 0,
    height: 60,
    color: Colors.BLUE_TEXT_COLOR,
  },
  buttonTitle: {
    fontSize: responsiveFontSize(1.6),
  },
  lineView: {
    width: 1,
    backgroundColor: 'gray',
    height: 43,
  },
  buttonRow: {
    flexDirection: 'row',
    height: 43,
    alignItems: 'center',
  },
  lineHorizontal: {
    width: responsiveScreenWidth(83),
    backgroundColor: 'gray',
    height: 1,
    marginTop: 18,
  },

  heightEdit: {height: 82},
  heightNormal: {height: 36},
  oneInput: {
    fontSize: 17,
    color: 'white',
    paddingBottom: 5,
  },
  inputIsEdit: {
    textAlignVertical: 'top',
  },
  inputNormal: {
    textAlignVertical: 'center',
  },
  bodyText: {
    textAlign: 'center',
    width: responsiveScreenWidth(77),
    fontSize: 13,
  },
  emptyView: {
    height: 15,
  },
  titleTxt: {
    color: Colors.WHITE_COLOR,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 14,
    fontSize: 16,
  },
});

export default DialogAlertCustom;
