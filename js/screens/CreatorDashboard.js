import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { images } from '../res/images';

const styles = StyleSheet.create({
  imageInRow: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }
});

class CreatorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portals: []
    };
  }
  async componentDidMount() {
    let { userId } = this.props.navigation.state.params;
    try {
      const { data } = await axios.get(
        `https://vast-falls-27580.herokuapp.com/api/portals/user/${userId}`
      );
      this.setState({ portals: data });
    } catch (error) {
      console.error(error);
    }
  }
  renderRow(portal) {
    return (
      <View
        key={portal.id}
        style={{
          flex: 2,
          alignSelf: 'stretch',
          maxHeight: 50,
          margin: 20,
          borderColor: '#0000ff',
          borderWidth: 3,
          flexDirection: 'row'
        }}
      >
        <View style={{ padding: 3 }}>
          <Text>{portal.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.imageInRow}
            source={images.thumbnails[portal.name]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Enter portal"
            onPress={() => {
              console.log('portal id when navigating', portal.id);
              this.props.navigation.navigate('ViroApp', {
                portalId: portal.id
              });
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Home" onPress={() => navigate('Homepage')} />
        <Text>View Your Portals</Text>
        {this.state.portals.map(portal => {
          return this.renderRow(portal);
        })}
        <Button
          title="Create New Portal"
          onPress={() => navigate('CreationPage', { userId: 2 })}
        />
      </View>
    );
  }
}

export default withNavigation(CreatorDashboard);
