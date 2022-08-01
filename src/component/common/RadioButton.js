import { View } from "react-native";
import React, {useState} from 'react';
import { Colors } from "@utility/constants/Colors";
export  function RadioButton(props) {
  return (
    <View style={[{
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.WHITE_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
    }, props.style]}>
      {
        props.selected ?
          <View style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: Colors.LOGO,
          }}/>
          : null
      }
    </View>
  );
}
