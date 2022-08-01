import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { stringHelper } from "@utility/helper/stringHelper";
import { Header, Loading } from "@component/common";
import { useNavigation } from "@react-navigation/native";
import navigationService from "@navigation/navigationService";
import * as areaActions from '@store/area/areaActions';
import { useDispatch, connect, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { Colors } from "@utility/constants/Colors";
import { valueConstant } from "@utility/constants/valueConstant";
import { showAlert } from "@utility/helper/functionHelper";
import * as historyActions from "@store/history/historyActions";

const Area = (props) =>  {

  const dispatch = useDispatch();
  const [selectedArea, setSelectedArea] = useState([]);
  const [selectedLoading, setSelectedLoading] = useState(true);
  const navigation = useNavigation();
  const {areaListArray, areaLoading} = props;
  let user=useSelector((state) => state.user)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(historyActions.getHistoryList(user)).then(
        data=>{
          if(data[0]!==undefined && data.length>0 && data[0].is_complete===false && data[0].is_canceled===false) {

            dispatch(areaActions.getAreasList()).then(()=>
            {
              dispatch(historyActions.notCompeleteHistory());
              navigationService.navigate('TabNavigator');
            })

          }
          else {

            dispatch(areaActions.getAreasList()).then(
              data => {

                const arrayTemp = data.map((e) => {
                  return {
                    ...e, selected: false
                  }
                })
                setSelectedArea(arrayTemp)
                setSelectedLoading(false)
              }
            )
          }
        }
      )

    });

    return () => {
      // executed when unmount
      unsubscribe();

    }
  }, [navigation]);
  const addAreasSelectedList=()=>{
    const arrayTemp = selectedArea.filter((e) => {
      if(e.selected===true)
      return e
    })
    if( arrayTemp.length===0) {
      showAlert(stringHelper.emptyList);
      return;
    }
    dispatch(areaActions.addAreasToSelectedList(arrayTemp));
    navigationService.navigate('Intensity');

  }
  const addAreasToList=(selectedIndex,i)=>{

    const arrayTemp = selectedArea.map((e) => {
      return {
        ...e, selected: e.id===selectedIndex.id ? !selectedArea[i].selected :
          e.selected
      }
    })

    setSelectedArea(arrayTemp)
  }
  return (
    <View style={styles.container}>
      <Header centerText={stringHelper.screens.area} />
      <KeyboardAvoidingView style={styles.exercises} behavior="position">
          { selectedLoading ? (
            <Loading />
          ) : (
        areaListArray.map((e, i) =>(
          <TouchableOpacity
            key={i}
            onPress={() => addAreasToList(e,i) }
                            style={styles.loginBtn}>
            <Text style={[styles.text,{backgroundColor:selectedArea!==[] && selectedArea[i].selected===true ?Colors.PRIMARY_COLOR:Colors.WHITE_COLOR}]}>{e.name}</Text>
            <Image style={styles.image}  tintColor={Colors.LOGO} source={require('../../assets/image/Pluse.png')}
              // style={{width:30,height:30}}
            />
          </TouchableOpacity>
        ))
            )}
      </KeyboardAvoidingView>
      <Button
        onPress={ () =>  addAreasSelectedList()}
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
    marginTop: 45, //36-12
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
    width: 90,
    borderRadius: 40,
    marginBottom:16,
    height: 50,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor: '#fff',
  },
  text:{
    width: 140,
    borderRadius: 20,
    height: 50,
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:15,
    marginEnd:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    areaListArray: state.area.areaList,
    areaLoading: state.area.loading,
  };
};

export default connect(mapStateToProps)(Area);
