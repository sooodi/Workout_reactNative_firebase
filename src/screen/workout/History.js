
import {
  Dimensions,
  FlatList, Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import navigationService from "@navigation/navigationService";
import { Colors } from "@utility/constants/Colors";
import { stringHelper } from "@utility/helper/stringHelper";
import { valueConstant } from "@utility/constants/valueConstant";
import { Header, Loading } from "@component/common";
import Icon from 'react-native-vector-icons/Ionicons';
import * as historyActions from "@store/history/historyActions";

export  const History=(props)=>  {

  const {historyListArray, historyLoading} = props;
  const [selectedLoading, setSelectedLoading] = useState(true);
  const dispatch = useDispatch();
  let user=useSelector((state) => state.user)

  useEffect(() => {

    dispatch(historyActions.getHistoryList(user)).then(
      data=>{

        setSelectedLoading(false)
      }
    )

  }, []);

  return (
    <View style={styles.container}>
      <Header
        centerText={stringHelper.screens.history}
        leftPress={() => navigationService.back()}
        // leftIcon={stringHelper.icons.return}
        leftText={stringHelper.back}
      />
      <KeyboardAvoidingView style={styles.exercises} behavior="position">
        { selectedLoading ? (
          <Loading />
        ) : (
        <FlatList
          data={historyListArray}
          keyExtractor={(item, index) => 'key'+index}
          renderItem={({ item,  index }) => {
            return (
              <TouchableOpacity
                onPress={()=>navigationService.navigate(
                  stringHelper.screens.detailHistory,{data:item} )}
                style={styles.containerTime}>

                <Text style={styles.txt} >{moment(
                  new Date(
                    item.created_at.seconds * 1000 +
                    item.created_at.nanoseconds / 1000000,
                  ).getTime(),
                ).format('dddd, MMMM D')}</Text>
                <Text style={styles.txt} >{item.total_calories} Kcal</Text>
                <Image style={styles.image} source={require('../../assets/image/next_arrow.png')}/>
              </TouchableOpacity>
            );
          }}
        />)}
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
  image:{
    width:25,
    height:25,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,

  },
  exercises: {
    alignItems: 'center',
    justifyContent:'center',
    height:'60%',
    width: '100%',
  },
  containerTime:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:8,
    paddingVertical:10,
    width: Dimensions.get('window').width,
    borderBottomColor:Colors.BORDER_BOTTOM,
    borderBottomWidth:1
  },

});
const mapStateToProps = (state) => {
  return {
    historyListArray: state.history.historyList,
    historyLoading: state.history.loading,
  };
};

export default connect(mapStateToProps)(History);
