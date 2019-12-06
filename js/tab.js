import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {
  MainScene,
  ViroApp,
  Homepage,
  ViewerDashboard,
  SinglePortal,
  PreviewPortal,
  CreationPage,
  CreatorDashboard,
} from './index';
import Swipe from '../js/screens/swipe';

const CreatorNavigator = createSwitchNavigator({
  CreatorDashboard: {screen: CreatorDashboard},
  CreationPage: {screen: CreationPage},
  PreviewPortal: {screen: PreviewPortal},
  SinglePortal: {screen: SinglePortal},
  ViroApp: {screen: ViroApp},
  MainScene: {screen: MainScene},
  Swipe: {screen: Swipe},
});
const ViewerNavigator = createSwitchNavigator({
  ViewerDashboard: {screen: ViewerDashboard},
  SinglePortal: {screen: SinglePortal},
  ViroApp: {screen: ViroApp},
  MainScene: {screen: MainScene},
});

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Homepage: {
      screen: Homepage,
      navigationOptions: {
        tabBarLabel: 'Homepage',
      },
    },
    Creator: {
      screen: CreatorNavigator,
      navigationOptions: {
        tabBarLabel: 'Creator',
      },
    },
    Viewer: {
      screen: ViewerNavigator,
      navigationOptions: {
        tabBarLabel: 'Viewer',
      },
    },
  },
  {
    shifting: false,
    activeColor: '#000000',
    inactiveColor: '#404040',
    barStyle: {
      backgroundColor: '#F0F0F0',
    },
    initialRouteName: 'Homepage',
    backBehavior: 'none',
  },
);
export default createAppContainer(TabNavigator);


