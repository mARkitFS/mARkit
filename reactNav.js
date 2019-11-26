import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { MainScene, ViroApp, Homepage, AppJs } from './js/index';

// import homepage from screens

const AppNavigator = createSwitchNavigator(
  {
    Homepage: { screen: props => <Homepage {...props} /> },
    ViroApp: { screen: ViroApp },
    MainScene: { screen: MainScene },
    AppJs: { screen: AppJs },
  },
  {
    initialRouteName: 'Homepage',
  }
);

// const TabNavigator = createBottomTabNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

const AppContainer = createAppContainer(AppNavigator);
// const TabContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
