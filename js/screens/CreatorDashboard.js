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
import DashboardItem from './dashboardItem'
import { withNavigation } from 'react-navigation';


// creating a row class to instantiate a row from
class CreatorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      userId: 0
    };
  }
  async componentDidMount() {
    let { userId } = this.props.navigation.state.params;
    this.setState({ userId: userId });
    console.log('userID:>>>>>', userId)
    try {
      const { data } = await axios.get(
        `https://vast-falls-27580.herokuapp.com/api/portals/user/${userId}`
      );
      this.setState({ items: data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // console.log('portals on state', this.state.portals);
    if (this.state.items.length === 0) {
      console.log('no items on state>>>>>>>')
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    const { navigate } = this.props.navigation
    console.log('this.state.items: >>>>>', this.state.items)
    return (
      <View style={styles.loader}>
        <Text>Search Portals: </Text>
        <TextInput
          style={{ height: 40, width: 150 }}
          placeholder="Portal name"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Search"
          onPress={() => {
            console.log('state: ', this.state);
            //set state to portals that match search
          }}
        />
        <View style={styles.middle}>
          <FlatList
            style={styles.container}
            data={this.state.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <DashboardItem item={item} screen='CreatorDashboard' userId={this.state.userId} />}
          />
        </View>

        <Button
          title="Create New Portal"
          onPress={() => navigate('CreationPage', { userId: this.state.userId })}
        />
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#F5FCFF'
    // backgroundColor: '#b2b2ff'
  },
  middle: {
    height: 400
  },
  loader: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default withNavigation(CreatorDashboard);
