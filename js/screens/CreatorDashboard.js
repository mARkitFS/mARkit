import React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import { images } from '../res/images';

const styles = StyleSheet.create({
  imageInRow: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

class CreatorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portals: [],
    };
  }
  async componentDidMount() {
    const { data } = await axios.get(`http://172.20.1.222:8080/api/portals`);
    this.setState({ portals: data });
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
          flexDirection: 'row',
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
                portalId: portal.id,
              });
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    console.log('portals on state', this.state.portals);
    const { navigate } = this.props.navigation;
    console.log('<<<nav', navigate);
    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Home" onPress={() => navigate('Homepage')} />
        <Text>View Your Portals</Text>
        {this.state.portals.map(portal => {
          return this.renderRow(portal);
        })}
        <Button
          title="Create New Portal"
          onPress={() => navigate('CreatePortal', { userId: 1 })}
        />
      </View>
    );
  }

  // render() {
  //   console.log('<<<<state', this.state);
  //   const { navigate } = this.props.navigation;
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         padding: 50,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <Button title="Home" onPress={() => navigate('Homepage')} />
  //       <Button
  //         title="Create New Portal"
  //         onPress={() => navigate('CreatePortal', { userId: 1 })}
  //       />
  //       <Text>Creator Dashboard Bitch</Text>
  //       <FlatList
  //         data={[
  //           { key: 1, value: 'Portal1' },
  //           { key: 2, value: 'Portal2' },
  //         ]}
  //         renderItem={({ item }) => (
  //           <Button
  //             title={item.value}
  //             onPress={() => navigate('ViewerDashboard')}
  //           />
  //         )}
  //       />
  //     </View>
  //   );
  // }
}

export default withNavigation(CreatorDashboard);
