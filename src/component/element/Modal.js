import React from 'react';
import {View, StyleSheet} from 'react-native';

import {ActionSheet, DialogAlertCustom} from '@component/common';

export const Modal = props => {

  const renderComponent = () => {
    return (
      <DialogAlertCustom
        data={props.route.params.modalProps.data}
        accept={props.route.params.modalProps.accept}
      />
    );
  };

  return <View style={styles.containerStyle}>{renderComponent()}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
