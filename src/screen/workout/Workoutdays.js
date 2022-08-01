import CheckBox from '@react-native-community/checkbox';

import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import navigationService from "@navigation/navigationService";
import { Colors } from "@utility/constants/Colors";
import { stringHelper } from "@utility/helper/stringHelper";
import { valueConstant } from "@utility/constants/valueConstant";
import * as areaActions from "@store/area/areaActions";
import * as userAction from "@store/user/userAction";
import { RadioButton } from "@component/common/RadioButton";
import { Header } from "@component/common";
import { showAlert } from "@utility/helper/functionHelper";
export  const Workoutdays=()=>  {

  const dispatch = useDispatch();
  const [days, setDays] = useState(
    [ {index:0,selected:false,time: '1 day'},
                {index:1,selected:false,time: '2 days'},
                {index:2,selected:false,time: '3 days'}] );

  let user=useSelector((state) => state.user)

  useEffect(() => {
    const arrayTemp = days.map((e) => {

      return {
        ...e, selected: e.index +1 === user.day_at_week
      }

    })

  }, []);
  const setCheckBox=(index)=> {

    const arrayTemp = days.map((e) => {
      return {
        ...e, selected: e.index === index
      }
    })
    setDays(arrayTemp)

  }
  const UpdateAndStartWorkout=()=>{
    let selectedDay= days.filter((e) => {
        if(e.selected===true)
          return e
    })
    if( selectedDay.length===0) {
      showAlert(stringHelper.dayWorkout);
      return;
    }
    let daysAtWeek=selectedDay[0].index+1

    dispatch(userAction.updateProfile(user.id,{ day_at_week:daysAtWeek})).then(
      (data)=>{

            navigationService.navigate('TabNavigator')
      }
    )

  }

    return (
      <View style={styles.container}>
        <Header
          centerText={stringHelper.screens.area}
           leftPress={() => navigationService.back()}
          // leftIcon={stringHelper.icons.return}
          leftText={stringHelper.back}
        />
        <KeyboardAvoidingView style={styles.exercises} behavior="position">
          <Text style={[styles.title, { marginTop: 50 }]}>How often would you like to work?</Text>
          <FlatList
            data={days}
            keyExtractor={(times) => times.id}
            renderItem={({ item,  index }) => {
              // console.log("days",JSON.stringify(days[index].selected))
              return (
                <TouchableOpacity
                  onPress={()=>setCheckBox(index)}
                  style={styles.containerTime}>
                  <RadioButton
                    selected={days[index].selected} />
                  <Text style={styles.txt} >{item.time}</Text>
                </TouchableOpacity>
              );
            }}
          />
         </KeyboardAvoidingView>
        <Button
          onPress={ () =>  UpdateAndStartWorkout()}
          buttonStyle={[
            styles.buttonStyle,
            {
              backgroundColor: Colors.BUTTON_DEACTIVE_COLOR,
            },
          ]}
          containerStyle={{ alignItems: 'center' }}
          titleStyle={{
            color:  Colors.FORMINPUT_COLOR,
          }}
          title={stringHelper.next}

        />
      </View>
    )

};
const styles = StyleSheet.create({
  title:{
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    fontSize:16,
    fontWeight:'bold',
    color:Colors.WHITE_COLOR
  },
  txt:{
    fontSize:16,
    marginHorizontal:16,
    color:Colors.WHITE_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,

  },
  exercises: {
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:20,
    height:'60%'
  },
  containerTime:{
    flexDirection:"row",
    justifyContent:'flex-start',
    marginTop:20,
    height:40,
  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,
    marginTop: 24, //36-12
  },

});
const mapStateToProps = (state) => {
  return {
    intensityListArray: state.intens.intensityList,
    intensityLoading: state.intens.loading,
  };
};

export default connect(mapStateToProps)(Workoutdays);
