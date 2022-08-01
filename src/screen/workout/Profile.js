import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity, KeyboardAvoidingView,
} from "react-native";
import navigationService from "@navigation/navigationService";
import { Colors } from "@utility/constants/Colors";
import { stringHelper } from "@utility/helper/stringHelper";
import { Header } from "@component/common";
import * as userAction from "@store/user/userAction";
import { showAlert } from "@utility/helper/functionHelper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const Profile = (props) =>  {
  const dispatch = useDispatch();
  let user=useSelector((state) => state.user)
  const navigation = useNavigation();
  console.log("user......",user.email)
  return (
    <View style={styles.container}>
      <Header
        centerText={stringHelper.screens.profile}

      />
      <Text style={[styles.logoutTxt,{marginBottom:16,  color:Colors.PRIMARY_COLOR}]}>{user.email}</Text>
      <KeyboardAvoidingView style={styles.exercises} behavior="position">

      <View style={{flexDirection:'row',alignItems:'center',  marginBottom: 50,}}>
        <Image style={styles.Img} tintColor={Colors.WHITE_COLOR} source={require('../../assets/image/profile.png')}
        />

        <TouchableOpacity
          style={styles.items}
          onPress={()=>navigationService.navigate(
            'EditProfile' ,)
          }
          >
          <Text style={styles.TextInput}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',  marginBottom: 50,}}>
        <Image style={styles.Img} tintColor={Colors.WHITE_COLOR}   source={require('../../assets/image/intensity.png')} />
        <TouchableOpacity
          style={styles.items}
          onPress={()=>navigationService.navigate(
           'Intensity' ,{edit:true})
          }>
          <Text style={[styles.TextInput,{flexDirection:'row'}]}>Workout Intensity</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',  marginBottom: 50,}}>
        <Image style={styles.Img} tintColor={Colors.WHITE_COLOR} source={require('../../assets/image/history.png')} />
        <TouchableOpacity style={styles.items}
                          onPress={()=>navigationService.navigate(
          stringHelper.screens.history )}>
          <Text style={styles.TextInput}>History</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.items}
                          onPress={()=>
                          {
                            dispatch(userAction.userLogout())
                              .then((result) => {
                                navigation.reset({
                                  index: 0,
                                  routes: [{name: stringHelper.screens.authStack}],
                                });
                              })
                              .catch((err) => {

                                showAlert(err);
                              });
                           }}>
          <Text style={styles.logoutTxt}>Logout</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  items:{
    backgroundColor: Colors.DATE_COLOR,
    alignItems: 'center'
  },
  Img: {
    width: 30,
    height: 30,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    // justifyContent: 'space-between'
  },
  logoutTxt:{
    fontSize: 16,
    color:Colors.HEADER_TEXT_COLOR
  },
  exercises: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop:50,
    marginLeft:20,
  },

  TextInput: {
    borderRadius: 12,
    height: 60,
    backgroundColor: Colors.WHITE_COLOR,
    paddingHorizontal: 10,
    width: 190,
    fontSize: 16,
    // flex: 1,
    padding: 10,
    marginLeft: 10,
  },
});
export default  Profile;
