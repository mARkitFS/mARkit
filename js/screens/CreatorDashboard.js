import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
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
      const { data } = await axios.get(
        `http://10.1.85.96:8080/api/portals/user/${userId}`
      );
      this.setState({items: data});
    } catch (error) {
      console.error(error);
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
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.loader}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    // backgroundColor: '#D6D3F0',
  },
  loader: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  cardText: {
    padding: 1,
    fontSize: 12,
    color: '#0B3142',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#D7D3F9',
    marginBottom: 10,
    marginTop: 10,
    marginRight: '50%',
    width: '25%',
    shadowColor: '#0B3142',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 20,
  },
});
export default withNavigation(CreatorDashboard);
