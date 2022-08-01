import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Colors} from '@utility/constants/Colors';

const Link = ({text, to}) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(to)}>
      <Text style={styles.txtStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txtStyle: {
    fontWeight: 'normal',
    fontSize: 13,
    color: Colors.PRIMARY_COLOR,
    paddingHorizontal: 5,
  },
});
export default Link;
