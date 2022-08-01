import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Colors} from '@utility/constants/Colors';


export const DeleteItem = (props) => {
  const {title, deleteAction} = props;
  return (
    <TouchableOpacity style={styles.trash} onPress={deleteAction}>

      <Text style={styles.trashTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trashTxt: {
    color: Colors.DELETE_COLOR,
    fontSize: 15,
    marginLeft: 12.6,
  },
  trash: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
