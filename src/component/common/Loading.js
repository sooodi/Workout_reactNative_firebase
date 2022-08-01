import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {Colors} from '@utility/constants/Colors';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.BUBBLE_SELF} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});
