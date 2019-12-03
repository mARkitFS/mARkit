import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
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
      const { data } = await axios.get(`http://10.1.85.95:8080/api/portals`);
      this.setState({ items: data });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    console.log('portals on state', this.state.portals);
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.loader}>
        <Text>Search Portals: </Text>
        <TextInput
          style={{ height: 40, width: 150 }}
          placeholder="Portal name"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Search"
          onPress={() => {
            console.log('state: ', this.state);
            //set state to portals that match search
          }}
        />
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
    backgroundColor: '#F5FCFF',
    // backgroundColor: '#b2b2ff'
  },
  loader: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
