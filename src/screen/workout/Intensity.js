import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView, ScrollView, Keyboard,
} from "react-native";
import { stringHelper } from "@utility/helper/stringHelper";
import { FormInput, Header, Loading } from "@component/common";
import { useNavigation } from "@react-navigation/native";
import * as IntensityActions from '@store/Intensity/IntensityActions';
import { useDispatch, connect, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { Colors } from "@utility/constants/Colors";
import { valueConstant } from "@utility/constants/valueConstant";

import navigationService from "@navigation/navigationService";
import { showAlert } from "@utility/helper/functionHelper";
import * as areaActions from "@store/area/areaActions";
import * as userAction from "@store/user/userAction";

const Intensity = (props) =>  {

  const dispatch = useDispatch();
  const [selectedIntensity, setSelectedIntensity] = useState(-1);
  const [userData, setUserData] = useState( useSelector((state) => state.user));
  const [selectedLoading, setSelectedLoading] = useState(true);
  const {intensityListArray, intensityLoading} = props;

  useEffect(() => {
    dispatch(IntensityActions.getIntensityList()).then(
      setSelectedLoading(false)
    )
    Keyboard.dismiss()
  }, []);

  const selectIntensity=(e,i)=>{
    setSelectedIntensity(i)
    dispatch(IntensityActions.selectIntensity(e));
  }
  const goNextPage=()=>{

    if( selectedIntensity===-1) {
      showAlert(stringHelper.emptyIntensity);
      return;
    }
    if(userData.targetWeight>userData.weight)
    {
      showAlert(stringHelper.weightCompare);
      return;
    }

    dispatch(userAction.updateProfile(userData.id,{
      targetWeight:userData.targetWeight,
      weight:userData.weight})).then(
      (data)=>{

        navigationService.navigate('WorkoutDays')
      }
    )

  }
  const  setCurrentValue=(value,field)=>{

    // console.log("hi setCurrentValue ",userData)
    if(!isNaN(value))
    setUserData({
      ...userData,
      [field]:parseInt(value)
    })
  }
  return (
    <View style={styles.container}>
      <Header
        centerText={stringHelper.screens.intensity}
        leftPress={() =>props.route?.params?.edit===true ? navigationService.navigate('TabNavigator') : navigationService.back()}
        leftIcon={stringHelper.icons.return}
        leftText={stringHelper.back}
      />
      <ScrollView>
      <KeyboardAvoidingView style={styles.exercises} behavior="position">
        {selectedLoading ? (
          <Loading />
        ) : (

          <View style={{marginTop:20}}>
            <Text style={[styles.title]}>Weights</Text>
            <FormInput
              value={isNaN(userData.weight)? "" :userData.weight.toString()}
              placeholderText={"Weight"}
              onChangeText={(value) => setCurrentValue(value,"weight")}
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              autoFocus={true}
            />
            <FormInput
              value={isNaN(userData.targetWeight) ? "" : userData.targetWeight.toString()}
              placeholderText={'Target Weight'}
              onChangeText={(value) => setCurrentValue(value,"targetWeight")}
              autoCapitalize="none"
              keyboardType="number-pad"
              autoCorrect={false}
              autoFocus={true}
            />
            <View style={{alignItems:'center',marginTop:25}}>
              {intensityListArray.map((e, i) =>
                (
            <TouchableOpacity
              key={i}
              onPress={() => selectIntensity(e,i)}
              style={styles.loginBtn}>
              <Text style={[styles.text,{backgroundColor:selectedIntensity===i ? Colors.PRIMARY_COLOR:Colors.WHITE_COLOR}]}>{e.name}</Text>
              <Image
                style={styles.image}
                source={require('../../assets/image/next_arrow.png')}
              />
            </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
        <Button
          onPress={ () =>goNextPage()}
          buttonStyle={[
            styles.buttonStyle,
            {
              backgroundColor: Colors.BUTTON_DEACTIVE_COLOR,
            },
          ]}
          containerStyle={{ alignItems: 'center' }}
          titleStyle={{
            color:  Colors.WHITE_COLOR,
          }}
          title={stringHelper.next}

        />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,
    marginTop:20,
  },
  exercises: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop:5,
  },
  image:{
    width:25,
    height:25,
  },

  loginBtn: {
    marginEnd:25,
    width: 90,
    borderRadius: 40,
    marginVertical:16,
    height: 50,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#97d8ef',
  },
  text:{
    width: 140,
    borderRadius: 20,
    height: 50,
    textAlign:'center',
    paddingTop:15,
    marginEnd:20,
    fontSize:16,
    fontWeight:'bold',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee557f',
  },
  title:{
    marginTop: 15,
    color:Colors.WHITE_COLOR,
    fontSize:16,
    fontWeight:'bold',
  }
});

const mapStateToProps = (state) => {
  return {
    intensityListArray: state.intens.intensityList,
    intensityLoading: state.intens.loading,
  };
};

export default connect(mapStateToProps)(Intensity);
