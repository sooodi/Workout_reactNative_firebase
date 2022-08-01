import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';
import { stringHelper } from "@utility/helper/stringHelper";
import { Header } from "@component/common";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utility/constants/Colors";
import moment from "moment";

export default function TimerComponent(props)  {


  const [running, setrunning] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const navigation = useNavigation();
  const  {minutes}=props.route.params
  const [timeElapsed, settimeElapsed] = useState( minutes*1000*60);
  let startTime=new Date().getTime()+ minutes*1000*60;

  useEffect(

    function () {
      if (!running) {
        return;
      }
      let rM=false;
      if(resetTime)
      {
        setResetTime(false)
        rM=true
        startTime=new Date().getTime()+ minutes*1000*60;
      }
      const intervalId = setInterval(() => {

          if(startTime-new Date().getTime()>0)
            settimeElapsed(startTime-new Date().getTime() )

      }, 1000);
      return () => {

        clearInterval(intervalId);
      };
    },
    [running]
  );
  const handleStartPress=()=> {

      setrunning( true)
  }
  const handleResetPress=()=>{
    settimeElapsed(minutes*1000*60)
    setResetTime(true)

  }
  const handleStopPress=()=> {
    setrunning( false)
  }

  const renderStartStopButton=()=> {
    const style = running ? styles.stopButton : styles.startButton;

    return (
      <View style={styles.container}>

      <TouchableHighlight
        style={[styles.button, style]}
        underlayColor="gray"
        onPress={()=>running ? handleStopPress() :handleStartPress()}
      >
        <Text>{ running ? 'Stop' : 'Start' }</Text>

      </TouchableHighlight>

      </View>
    );
  }

  const renderResetButton=()=> {

    return (

        <TouchableHighlight
          style={[styles.button,{marginTop:150}]}
          underlayColor="gray"
          onPress={()=>{!running ? handleResetPress():null}}>
          <Text>reset</Text>
        </TouchableHighlight>
    );
  }

  function convert(length) {

    if(!length) {
      return '00:00'
    }

    let duration = moment.duration(length);
    let formattedDuration = '';

    formattedDuration +=duration.minutes() + ':';
    formattedDuration += duration.seconds();

    return formattedDuration;
  }

    return (
      <View style={styles.container}>
        <Header
          centerText={stringHelper.screens.timerComponent}
          leftPress={() => navigation.goBack()}
          leftIcon={stringHelper.icons.return}
          leftText={stringHelper.back}
        />

        <View style={styles.header}>
          <Text  style={styles.timerTop}>{ minutes }  Minutes</Text>
          <Text style={styles.timer}>
            { convert(timeElapsed) }
          </Text>
            { renderStartStopButton() }
            { renderResetButton() }
        </View>

      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DATE_COLOR,
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems:'center'
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  timerTop: {
    fontSize: 25,
    color:'white',
    borderBottomWidth:1,
    marginVertical:16
  },
  buttonWrapper: {
    marginHorizontal:20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

