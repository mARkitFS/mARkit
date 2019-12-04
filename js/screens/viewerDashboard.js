import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import DashboardItem from './dashboardItem';
import {images} from '../res/images';

// creating a row class to instantiate a row from
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  async componentDidMount() {
    try {
<<<<<<< HEAD
      const { data } = await axios.get(
        `http://10.1.85.88:8080/api/portals`
      );
      this.setState({ items: data });
=======
      const {data} = await axios.get(`http://10.1.85.96:8080/api/portals`);
      this.setState({items: data});
>>>>>>> 146c2328d9f4362f9d5d2b526e8a9df6dbd06db1
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
        <View>
          <Text style={styles.title}> Welcome to the Viewer Dashboard! </Text>
        </View>
        <FlatList
          style={styles.container}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
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
    backgroundColor: '#D6D3F0',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Academy Engraved LET',
    fontSize: 30,
    color: '#0B3142',
    textAlign: 'center',
    marginTop: 40,
  },
  loader: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6D3F0',
  },
});
