import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '@utility/constants/Colors';

const EmptyList = ({text, textStyle}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.DATE_COLOR,
  },
});

export default EmptyList;
