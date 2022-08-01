

import { FlatList, KeyboardAvoidingView,
  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import navigationService from "@navigation/navigationService";
import { Colors } from "@utility/constants/Colors";
import { stringHelper } from "@utility/helper/stringHelper";
import { valueConstant } from "@utility/constants/valueConstant";
import {getNameFromDB} from '@utility/helper/functionHelper';
import { Header } from "@component/common";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import * as exerciseActions from "@store/exercise/exerciseActions";


export  const DetailHistory=(props)=>  {

  let intensities=useSelector((state) => state.intens.intensityList)
  let areas=useSelector((state) => state.area.areaList)

  const [workoutExcersises, setWorkoutExcersises] = useState([]);
  const dispatch = useDispatch();
  const {data}=props.route?.params

  useEffect(() => {

    let resultExcer=[]
    data.exercises_id.map((excId) => {

      dispatch(exerciseActions.getExerciseById(excId)).then(
        data=>{
          if(data!==null)
          resultExcer=[...resultExcer,data]
          // console.log("getExerciseById  val", JSON.stringify(resultExcer))
          setWorkoutExcersises(resultExcer)
        }
      )
    })


  }, []);

  return (
    <View style={styles.container}>
      <Header
        centerText={stringHelper.screens.detailHistory}
        leftPress={() => navigationService.back()}
        // leftIcon={stringHelper.icons.return}
        leftText={stringHelper.back}
      />
      <KeyboardAvoidingView style={styles.exercises} behavior="position">
        <Text style={styles.txt} >{moment(
          new Date(
            data.created_at.seconds * 1000 +
            data.created_at.nanoseconds / 1000000,
          ).getTime(),
        ).format('dddd, MMMM D')}</Text>
        <Text style={styles.txt} >Total Calories: {data.total_calories} Kcal</Text>
        <Text style={styles.txt} >Intensity :{getNameFromDB(intensities,data.intensity_id)} </Text>
        <Text style={styles.txt} >repeat: {data.day_at_week}   days at week</Text>
        <Text style={styles.txt} > { data.is_canceled ?`is_canceled:Yes`:`is_canceled:No`} </Text>
        <FlatList
          data={workoutExcersises}
          keyExtractor={(times) => times.id}
          renderItem={({ item,  index }) => {
            return (
              <View
                style={styles.containerTime}>
                <Text style={styles.txt} >{item.duration} minutes</Text>
                <Text style={styles.txt} >Area : {getNameFromDB(areas,item.area_id)} </Text>
              </View>
            );
          }}
        />
      </KeyboardAvoidingView>
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

export default connect(mapStateToProps)(DetailHistory);
