import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Colors} from '@utility/constants/Colors';
import {valueConstant} from '@utility/constants/valueConstant';

const FormInput = ({
  onSubmitEditing,
  labelValue,
  placeholderText,
  returnKeyType,
  autoFocus = false,
  ...rest
}) => {
  return (
    <TextInput
      onSubmitEditing={onSubmitEditing}
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      returnKeyType={returnKeyType}
      placeholderTextColor={Colors.LITE_GRAY_COLOR}
      // autoFocus={autoFocus}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 12,
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    color: Colors.WHITE_COLOR,
    backgroundColor: Colors.FORMINPUT_COLOR,
    fontSize: 14,
    borderRadius: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
    height: 44,
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
  },
});

export default FormInput;
