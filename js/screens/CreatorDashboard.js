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
        `http://10.1.85.96:8080/api/portals/user/${userId}`
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
          maxHeight: 50,
          margin: 20,
          borderColor: '#0000ff',
          borderWidth: 2,
          flexDirection: 'row'
        }}
      >
        <View style={{ padding: 3, flex: 1, alignItems: 'stretch' }}>
          <Text>{portal.name}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <Image
            style={styles.imageInRow}
            source={images.portalThumbnails[portal.name]}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          <Button
            title="Enter portal"
            onPress={() => {
              console.log('portal id when navigating', portal.id);
              this.props.navigation.navigate('SinglePortal', {
                portal: portal
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
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#b2b2ff'
        }}
      >
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
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
      </View>
    );
  }
}

export default withNavigation(CreatorDashboard);
