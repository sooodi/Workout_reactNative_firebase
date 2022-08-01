import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {Modal} from '@component/element';
import RootNavigator from './ScreensStack';
import navigationService from './navigationService';

import store from '@store/store';

import {Colors} from '@utility/constants/Colors';

const Stack = createStackNavigator();

const Router = () => {
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  // useEffect(() => {
  //
  //
  //
  // }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeAreaView style={styles.topSafeViewStyle} />
        <SafeAreaView style={styles.entireScreenSafeViewStyle}>
          <StatusBar barStyle="light-content" />
          <NavigationContainer
            ref={async navigatorRef => {
              await navigationService.setTopLevelNavigator(navigatorRef);
            }}>
            <Stack.Navigator
              mode="modal"
              headerMode="none"
              initialRouteName="Root">
              <Stack.Screen name="Root"
                            component={RootNavigator} />
              <Stack.Screen
                name="Modal"
                component={Modal}
                options={{cardStyle: {backgroundColor: 'transparent'}}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

const NetworkError = () => {
  return (
    <View style={styles.networkErrorBoxStyle}>
      <Text style={styles.networkErrorTextStyle}>
        Seems like you may have internet issues. Please try again later.{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entireScreenSafeViewStyle: {
    flex: 1,
    backgroundColor:  Colors.DATE_COLOR,
  },
  topSafeViewStyle: {
    flex: 0,
    backgroundColor: Colors.DATE_COLOR,
  },
  networkErrorBoxStyle: {
    width: '100%',
    height: 60,
    backgroundColor: Colors.DELETE_COLOR,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  networkErrorTextStyle: {
    color: '#FFF',
  },
});

export default Router;
