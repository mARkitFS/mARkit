import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import axios from 'axios';
import DashboardItem from './dashboardItem';
import {withNavigation} from 'react-navigation';

// creating a row class to instantiate a row from
class CreatorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      userId: 0,
    };
  }
  async componentDidMount() {
    let {userId} = this.props.navigation.state.params;
    this.setState({userId: userId});
    try {
      const {data} = await axios.get(
        `http://10.1.85.96:8080/api/portals/user/${userId}`,
      );
      this.setState({items: data});
    } catch (error) {
      console.error(error);
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
    console.log('<<<<<< myprops', this.props);
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const {navigate} = this.props.navigation;
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
          <Text style={styles.title}> Welcome to the Creator Dashboard! </Text>
        </View>
        <FlatList
          style={styles.container}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <DashboardItem
              item={item}
              screen="CreatorDashboard"
              userId={this.state.userId}
            />
          )}
        />
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigate('CreationPage', {userId: this.state.userId})}>
          <Text style={styles.cardText}> Create New Portal </Text>
        </TouchableOpacity>
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
    marginTop: 60,
  },
  cardText: {
    padding: 1,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: 400,
    backgroundColor: '#FDB327',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
export default withNavigation(CreatorDashboard);
