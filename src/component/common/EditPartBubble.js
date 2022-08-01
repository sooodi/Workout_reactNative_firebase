import {TouchableOpacity} from 'react-native-gesture-handler';

import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

import {stringHelper} from '@utility/helper/stringHelper';
import {Colors} from '@utility/constants/Colors';

const EditPartBubble = (props) => {
  const {editPart, changeFocusInput} = props;
  return (
    <TouchableOpacity
      çkeyboardShouldPersistTaps="always"
      onPressIn={editPart}
      onPressOut={changeFocusInput}
      style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.txtStyle}>{stringHelper.part.edit}</Text>
      </View>
      <View style={[styles.triangleA, styles.arrowDownA]}>
        <View style={[styles.triangle, styles.arrowDown]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(13),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  view: {
    opacity: 1,
    width: responsiveScreenWidth(13),
    paddingHorizontal: 10,
    backgroundColor: Colors.BORDER_COLOR,
    height: responsiveScreenHeight(5),
    borderWidth: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    position: 'absolute',
    right: -7,
    bottom: 0,
  },
  txtStyle: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 14,
  },
  arrowDown: {
    borderTopWidth: 9,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 7,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: Colors.BORDER_COLOR,
    marginLeft: 14,
  },
  triangleA: {
    marginLeft: 37,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 0,
  },
  arrowDownA: {
    borderRightWidth: 7,
    borderLeftWidth: 7,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopWidth: 7,
    borderTopColor: 'transparent',
    marginLeft: 0,
    marginBottom: 5,
    zIndex: 10,
    borderBottomWidth: -7,
    padding: 0,
  },
});

export default EditPartBubble;
