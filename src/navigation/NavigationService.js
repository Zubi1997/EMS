import {NavigationActions, CommonActions} from '@react-navigation/native';
// import { CommonActions } from '@react-navigation/native';

let _navigator;
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}
function navigate(routeName, params) {
  _navigator.navigate(routeName, params);
}
function navigateToNestedStack(parentRouteName, childRouteName, params) {
  _navigator?.navigate(parentRouteName, {
    screen: childRouteName,
    params: params,
  });
}
function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

function reset(routeName, params) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  reset,
  navigateToNestedStack,
};
