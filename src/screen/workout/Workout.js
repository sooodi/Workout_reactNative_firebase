import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,

  TouchableOpacity, KeyboardAvoidingView, ScrollView,
} from "react-native";
import { stringHelper } from "@utility/helper/stringHelper";
import { Header, Loading } from "@component/common";

import navigationService from "@navigation/navigationService";
import { Colors } from "@utility/constants/Colors";
import { connect, useDispatch, useSelector } from "react-redux";
import * as exerciseActions from "@store/exercise/exerciseActions";
import * as historyActions from "@store/history/historyActions";
import { createHistory } from "@store/history/historyActions";
import { valueConstant } from "@utility/constants/valueConstant";
import { Button } from "react-native-elements";
import { getNameFromDB } from "@utility/helper/functionHelper";

const Workout = (props) =>  {

  const [selectedLoading, setSelectedLoading] = useState(true);
  const dispatch = useDispatch();

  let intensity=useSelector((state) => state.intens)
  let area=useSelector((state) => state.area)
  let user=useSelector((state) => state.user)
  let history=useSelector((state) => state.history)
  const {exerciseListArray, exerciseLoading} = props;


  useEffect(() => {

    const areaIds = area.areaSelectedList.map((e) =>( e.id))
    if(areaIds.length===0 || history.hasLastWorkout)
    {

      dispatch(exerciseActions.getExerciseListByIDS(history.historyList[0].exercises_id)).then(
        data=>{
          setSelectedLoading(false)
        })
    }
      else {
      dispatch(exerciseActions.getExerciseList(intensity.intensityData.id, areaIds)).then(
        data => {

          let excersise_ids = data.map((e) => e.id);
          let total_calories=0;
            data.map((e) => {
            total_calories +=parseInt(e.Calories)
          });

          dispatch( historyActions.createHistory({
            exercises_id: excersise_ids,
            user_id: user.id,
            intensity_id: intensity.intensityData.id,
            day_at_week: user.day_at_week,
            total_calories: total_calories
          }))
          setSelectedLoading(false)
        })
    }
  }, []);

  const getNameArea=(id)=>{

   let selectArea= area.areaList.filter((e) => {
       if(e.id===id)
         return e.name
     // console.log("getNameArea",e)
    })
    // console.log("getNameAre a",id,selectArea[0])
    return selectArea[0].name
  }

 const cancelWorkout=()=>{

   setSelectedLoading(true)

   dispatch(historyActions.cancelWorkout(history.historyList[0].id, {is_canceled:true})).then(
     data => {
       console.log("cancelWorkout resp", JSON.stringify(data))
       navigationService.navigate('Area');
       setSelectedLoading(false)
     })
 }

  return (
    <View style={styles.container}>
      <Header
        centerText={stringHelper.screens.workout}

      />
      <KeyboardAvoidingView style={styles.exercises} behavior="position">
        { selectedLoading ? (
          <Loading />
        ) : (
          exerciseListArray.map((e, i) =>
        <TouchableOpacity key={i}
          onPress={()=>  navigationService.navigate(stringHelper.screens.timerComponent ,{
            minutes:e.duration,
            intensity:getNameFromDB(intensity.intensityList,e.intensity_id),
            areaName:getNameArea( e.area_id)
          })}
                          style={styles.loginBtn}>
          <Text style={styles.text}>{getNameArea( e.area_id)}</Text>
          <Text style={styles.text}>{e.duration} Minutes</Text>
          <Image style={styles.image} source={require('../../assets/image/next_arrow.png')}
          />
        </TouchableOpacity>
        )
          )}

      </KeyboardAvoidingView>
      <Button
        onPress={ () =>  cancelWorkout()}
        buttonStyle={[
          styles.buttonStyle,
          {
            backgroundColor: Colors.DELETE_COLOR,
          },
        ]}
        containerStyle={{ alignItems: 'center',  position:'absolute',
          bottom:40,
          left:0,right:0 }}
        titleStyle={{
          color:  Colors.WHITE_COLOR,
        }}
        title={"Cancel & Create new workout"}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,

  },
  exercises: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop:25,
    marginLeft:20,
  },
  image:{
    width:25,
    height:25,
  },

  loginBtn: {
    marginEnd:25,
    marginBottom:25,
    paddingHorizontal:20,
    height: 50,
    borderRadius:20,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#97d8ef',
  },
  text:{
    fontSize:16,
    fontWeight:'bold',
    marginHorizontal:20,
  },
});



const mapStateToProps = (state) => {
  return {
    exerciseListArray: state.exercise.exerciseList,
    exerciseLoading: state.exercise.loading,
  };
};

export default connect(mapStateToProps)(Workout);
