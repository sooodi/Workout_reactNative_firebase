import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import userQueries from '@store/user/userQueries';
import * as userActions from '@store/user/userAction';
import {Colors} from '@utility/constants/Colors';
import {stringHelper} from '@utility/helper/stringHelper';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const screenNames = stringHelper.screens;

  React.useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    const user = auth().currentUser;
    if (user === null) {
      navigation.reset({
        index: 0,
        routes: [{name: screenNames.authStack}],
      });
    } else {
      userQueries
        .find([
          {
            type: 'where',
            params: {
              field: 'email',
              conditionType: '==',
              value: user._user.email,
            },
          },
        ])
        .then(response => {
          if (response.result) {
            dispatch(userActions.setUserData(response.data[0]));
            navigation.reset({
              index: 0,
              routes: [{name: screenNames.mainStack}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: screenNames.authStack}],
            });
          }
        })
        .catch(() => {
          navigation.reset({
            index: 0,
            routes: [{name: screenNames.authStack}],
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brandNameTextStyle}>Workout </Text>
      <Text style={[styles.brandNameTextStyle,{ fontSize: 20,}]}>Created by Arash  </Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageStyle: {
    marginBottom: 40,
    width: 130,
    height: 130,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DATE_COLOR,
  },
  versionNumberStyle: {
    color: Colors.BORDER_COLOR,
    position: 'absolute',
    bottom: 10,
  },
  brandNameTextStyle: {
    fontSize: 25,
    color: '#FFF',
    marginBottom: 40,
  },
});

export default Splash;
