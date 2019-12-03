import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class Homepage extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style = {styles.card}>
            <Text style={styles.cardTitle}>What is mARkit:</Text>
            <Text style={styles.cardText}>mARkit is a creator tool and a viewer experience. Creators can build their own AR experience for viewers to find through online search or geolocation.</Text>
          </View>
          <TouchableOpacity style = {styles.card} onPress={() => navigate('ViewerDashboard')}>
            <Text style={styles.cardTitle}>mARkit for Viewers:</Text>
            <Text style={styles.cardText}>Go to your viewer dashboard and find portals that that interest you from private events, to merchant sales, and community projects. There is an AR experience for everyone.  </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.card} onPress={() => navigate('CreatorDashboard', { userId: 1 })}>
            <Text style={styles.cardTitle}>mARkit for Creators:</Text>
            <Text style={styles.cardText}>Go to your creator dashboard and search range of images to create a custom AR experience. If you don't find the one you want, upload your own and get started creating your experience. </Text>
          </TouchableOpacity>
        <Button
          title="Viewer Dashboard"
          onPress={() => navigate('ViewerDashboard')}
        />
        <Button
          title="Creator Dashboard"
          onPress={() => navigate('CreatorDashboard', { userId: 1 })}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D6D3F0',
    marginBottom: 20,
    marginLeft: '5%',
    height: '25%',
    width: '85%',
    shadowColor: '#0B3142',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: '85%',
    height: 300,
    resizeMode: 'cover'
  },
  cardTitle: {
    padding: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  cardText: {
    padding: 5,
    fontSize: 16,
    color: '#0B3142'
  }

})

export default withNavigation(Homepage);
