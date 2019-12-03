import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import axios from 'axios';
import DashboardItem from './dashboardItem';
import { images } from '../res/images';

// creating a row class to instantiate a row from
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get(`https://vast-falls-27580.herokuapp.com/api/portals`);
      this.setState({ items: data });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.loader}>
        <View >
          <Text style={styles.title}> Welcome to the Viewer Dashboard! </Text>
        </View>
        <FlatList
          style={styles.container}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DashboardItem item={item} screen="ViewerDashboard" />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#D6D3F0'
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Academy Engraved LET',
    fontSize: 30,
    color: '#0B3142',
    textAlign: 'center'
  },
  loader: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
