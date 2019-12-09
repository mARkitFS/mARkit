import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Animated,
  TouchableOpacity,
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
      const {data} = await axios.get(`http://10.1.85.95:8080/api/portals`);
      this.setState({items: data});
    } catch (err) {
      console.error(err);
    }

    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  render() {
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const interpolatedColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['black', '#0B3142'],
    });
    return (
      <Animated.View
        style={{
          flex: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: interpolatedColor,
        }}>
        <View>
          <Text style={styles.title}> Welcome to the Viewer Dashboard! </Text>
        </View>
        <View>
          <Text style={styles.title}> Top Categories: </Text>
          <TouchableOpacity
            onPress={() => navigate('FilteredDashboard', {userId: 1})}>
            <Text>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Kids Activities</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Night Life</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.container}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <DashboardItem item={item} screen="ViewerDashboard" />
          )}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
  },
});
