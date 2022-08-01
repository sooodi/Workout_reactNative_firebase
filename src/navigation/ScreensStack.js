import React from 'react';
import {Platform, View, Text, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// ====================== Auth Screens
import SignUp from '@screen/auth/SignUp';
import Login from '@screen/auth/Login';
import ForgetPassword from '@screen/auth/ForgetPassword';
import Splash from '@screen/auth/Splash';
import {stringHelper} from '@utility/helper/stringHelper';
import {Colors} from '@utility/constants/Colors';
import {useHiddenTabs} from './navigationService';
import Workout from '@screen/workout/Workout';
import  Profile  from "@screen/workout/Profile";
import Area from "@screen/workout/Area";
import Intensity from "@screen/workout/Intensity";
import  TimerComponent  from "@screen/workout/timerComponent";
import  Workoutdays  from "@screen/workout/Workoutdays";
import EditProfile from "@screen/workout/EditProfile";
import History from "@screen/workout/History";
import DetailHistory from "@screen/workout/DetailHistory";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenNames = stringHelper.screens;
const routesWithTab = [screenNames.Workout,screenNames.profile];
const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={screenNames.signup} component={SignUp} />
      <Stack.Screen name={screenNames.login} component={Login} />
      <Stack.Screen
        name={screenNames.forgetPassword}
        component={ForgetPassword}
      />
    </Stack.Navigator>
  );
};

const WorkoutStack = () => {
  useHiddenTabs(routesWithTab, screenNames.Workout);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={screenNames.Workout} component={Workout} />
      <Stack.Screen name={screenNames.timerComponent} component={TimerComponent} />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  useHiddenTabs(routesWithTab, screenNames.profile);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={screenNames.profile} component={Profile} />
      <Stack.Screen name={screenNames.editProfile} component={EditProfile} />
      <Stack.Screen name={screenNames.history} component={History} />
      <Stack.Screen name={screenNames.detailHistory} component={DetailHistory} />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  const tabBarIcon = (tabName, normalName, focusedName, focused) => {
    const styles = {
      itemBoxStyle: {
        width: '90%',
        height: '90%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
    };

    const color = focused ? Colors.WHITE_COLOR : Colors.BORDER_BOTTOM;
    return (
      <View style={styles.itemBoxStyle}>
        <Image
         style={{width:25,height:25}}
          source={normalName}
          tintColor={focused ? Colors.WHITE_COLOR : Colors.BORDER_BOTTOM}
        />
        <Text style={{color: color, fontSize: 13}}>{tabName}</Text>
      </View>
    );
  };

  const tabBarOptions = {
    showIcon: true,
    showLabel: false,
    inactiveBackgroundColor:  Colors.DATE_COLOR,
    activeBackgroundColor: Colors.DATE_COLOR,
    style: {
      height: 70,
      backgroundColor:  Colors.DATE_COLOR,
      borderTopWidth: 1,
      borderTopColor: '#4e4f5d',
      paddingBottom: 12,
      paddingTop: 5,
    },
  };

  return (
    <Tab.Navigator
      initialRouteName={screenNames.Workout}
      tabBarOptions={tabBarOptions}
      options={{tabBarLabel: 'Home!'}}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
          headerForceInset: {top: 0, bottom: 'never'},
        },
      }}>
      <Tab.Screen
        name={"Workout"}
        component={WorkoutStack}
        options={{
          tabBarIcon: ({focused}) =>
            tabBarIcon('Workout', require('../assets/image/workoutb.png'), '../assets/image/workoutb.png', focused),
        }}
      />
      <Tab.Screen
        name={"profile"}
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) =>
            tabBarIcon('profile', require('../assets/image/person.png'), '../assets/image/person.png', focused),
        }}
      />
    </Tab.Navigator>
  );
};
const SettingStack = () => {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={screenNames.area} component={Area} />
      <Stack.Screen name={screenNames.intensity} component={Intensity} />
      <Stack.Screen name={screenNames.workoutDays} component={Workoutdays} />
    </Stack.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={screenNames.settingNavigator} component={SettingStack} />
      <Stack.Screen name={screenNames.tabNavigator} component={TabNavigator} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={screenNames.splash} component={Splash} />
      <Stack.Screen name={screenNames.mainStack} component={MainNavigator} />
      <Stack.Screen name={screenNames.authStack} component={AuthStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
