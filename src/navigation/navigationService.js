import {useLayoutEffect} from 'react';

import {
  StackActions,
  CommonActions,
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
  TabActions,
} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name, params = {}, animation = true) {
  const action = CommonActions.navigate({
    name,
    params,
  });

  _navigator.dispatch(action);
}

function navigateReset(name, params) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name, params}],
    }),
  );
}

function navigateReplace(name, params) {
  //  _navigator.dispatch(CommonActions.goBack());
  const action = CommonActions.navigate({
    name,
    params,
  });
  _navigator.dispatch(action);
}

function navigatePush(name, params) {
  const action = StackActions.push({
    name,
    params,
  });
  _navigator.dispatch(action);
}

function back() {
  _navigator.dispatch(CommonActions.goBack());
}

function backTo(name) {
  _navigator.dispatch(
    CommonActions.goBack({
      key: name,
    }),
  );
}

function changeTab(tabName, params = {}) {
  const jumpToAction = TabActions.jumpTo(tabName, params);
  _navigator.dispatch(jumpToAction);
}

export function useHiddenTabs(hiddenTabRoutesArray, fallbackRoute) {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? fallbackRoute;
    navigation.setOptions({
      tabBarVisible: hiddenTabRoutesArray.includes(routeName),
    });
  }, [navigation, route]);
}

export default {
  navigate,
  navigateReset,
  navigatePush,
  back,
  backTo,
  navigateReplace,
  setTopLevelNavigator,
};
