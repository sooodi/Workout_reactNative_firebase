import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert,
} from "react-native";
import { stringHelper } from "@utility/helper/stringHelper";
import { useDispatch, connect, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { Colors } from "@utility/constants/Colors";
import { valueConstant } from "@utility/constants/valueConstant";
import profilePng from "@assets/image/profile.png";
import FormInput from "../../component/common/FormInput";
import * as userAction from "@store/user/userAction";
import navigationService from "@navigation/navigationService";
import { calculateAge, showAlert, validateEmail } from "@utility/helper/functionHelper";
import DatePicker from "react-native-date-picker";
import { Header } from "@component/common";

const EditProfile = (props) =>  {

  const dispatch = useDispatch();
  let user=useSelector((state) => state.user)
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [birthday, setBirthday] = useState(calculateAge(user.birthday,true));
  const [height, setHeight] = useState(user.height.toString());
  const [weight, setWeight] = useState(user.weight.toString());
  const [targetWeight, setTargetWeight] = useState(user.targetWeight.toString());
  const [dataPickerActive, setDataPickerActive] = useState(false);
  const [date, setDate] = useState(new Date())

  const doUpdate=()=>{

    if (!loading) {
      if (
        firstName === '' ||
        lastName === '' ||
        birthday === '' ||
        height === ''   ||
        weight === ''   ||
        targetWeight === ''
      ) {
        showAlert(stringHelper.auth.fillData);
      }
       else {
        setLoading(true);
        dispatch(userAction.updateProfile(user.id,{
          first_name:firstName,
          last_name:lastName,
          birthday:date,
          height:parseInt(height),
          weight:parseInt(weight),
          targetWeight:parseInt(targetWeight)})).then(
          ()=>{

           Alert.alert(stringHelper.profile.updatedProfile);
            setLoading(false);
           // navigationService.back()

          }).catch((err)=> {
          navigationService.back()
          showAlert(stringHelper.tryLater);
          setLoading(false)
        } )
      }
    }

  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollViewStyle}>
      <Header
        centerText={""}
        leftPress={() => navigationService.back()}
        leftIcon={stringHelper.icons.return}
        leftText={stringHelper.back}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <Image source={profilePng} tintColor={Colors.LOGO} style={styles.imageStyle} />
        <Text style={styles.text}>{stringHelper.profile.editProfile}</Text>
        <FormInput
          value={firstName}
          placeholderText={stringHelper.profile.firstName}
          onChangeText={(txt) => setFirstName(txt)}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => null}
          // returnKeyType={returnKeyTypeConfig()}
        />
        <FormInput
          value={lastName}
          placeholderText={stringHelper.profile.firstName}
          onChangeText={(txt) => setLastName(txt)}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => null}
          // returnKeyType={returnKeyTypeConfig()}
        />
        <FormInput
          value={height}
          placeholderText={stringHelper.profile.height}
          onChangeText={(txt) =>{
            if(isNaN(Number(txt)) )
              showAlert(stringHelper.profile.numberType+"<"+stringHelper.profile.height+">");
            else
                setHeight(txt)}}
          autoCapitalize="none"
          keyboardType="email-address"
          // returnKeyType={returnKeyTypeConfig()}
          autoCorrect={false}
        />
        <FormInput
          value={weight}
          placeholderText={stringHelper.profile.weight}
          onChangeText={(txt) =>{
            if(isNaN(Number(txt)) )
              showAlert(stringHelper.profile.numberType+"<"+stringHelper.profile.weight+">");
            else
              setWeight(txt)}}
          autoCapitalize="none"
          keyboardType="email-address"
          // returnKeyType={returnKeyTypeConfig()}
          autoCorrect={false}
        />
        <FormInput
          value={targetWeight}
          returnKeyType={'done'}
          placeholderText={stringHelper.profile.targetWeight}
          onChangeText={(txt) =>{
            if(isNaN(Number(txt)) )
              showAlert(stringHelper.profile.numberType+"<"+stringHelper.profile.targetWeight+">");
            else
              setTargetWeight(txt)}}
          secureTextEntry={false}
        />
        <TouchableOpacity onPress={() => setDataPickerActive(true) }
                          style={styles.input}>
        <Text  style={styles.textTerm}>{birthday}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={dataPickerActive}
          date={date}
          mode={"date"}
          onConfirm={(date) => {
            setDataPickerActive(false)
             setDate(date)
             setBirthday(calculateAge(date,false))
          }}
          onCancel={() => {
            setDataPickerActive(false)
          }}
        />
        <Button
           onPress={() => doUpdate()}
           buttonStyle={[
            styles.buttonStyle,
            {
              backgroundColor:
              firstName &&
              lastName &&
              birthday  &&
              height  &&
              weight   &&
              targetWeight
                  ? Colors.PRIMARY_COLOR
                  : Colors.BUTTON_DEACTIVE_COLOR,
            },
          ]}
          titleStyle={{
            color:
              firstName &&
              lastName &&
              birthday  &&
              height  &&
              weight   &&
              targetWeight
                ? Colors.WHITE_COLOR
                : Colors.FORMINPUT_COLOR,
          }}
          containerStyle={styles.buttonContainerStyle}
          title={stringHelper.save}
          loading={loading}
        />

      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.DATE_COLOR,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
  },

  input: {
    padding: 10,
    marginTop: 12,
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    color: Colors.WHITE_COLOR,
    backgroundColor: Colors.BACK_FORMINPUT_COLOR,
    fontSize: 14,
    borderRadius: 10,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,
    marginTop:30,
  },
  imageStyle: {
    width: 70,
    height: 70,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    color: Colors.WHITE_COLOR,
  },
  textTerm: {
    fontSize: 13,
    color: Colors.WHITE_COLOR,
  },
  navButtonHint: {
    marginTop: 20,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    color: Colors.WHITE_COLOR,
  },
  loginBtnTextStyle: {
    marginTop: 6,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.PRIMARY_COLOR,
  },
  loginBtnStyle: {
    marginTop: 5,
    padding: 10,
    paddingHorizontal: 15,
  },
  buttonContainerStyle: {
    alignItems: 'center',
  },
});


const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(EditProfile);
