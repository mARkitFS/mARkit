import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {withNavigation} from 'react-navigation';

class Homepage extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  }

  render() {
    const {navigate} = this.props.navigation;
    const interpolatedColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['white', '#0B3142'],
    });
    return (
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: interpolatedColor,
        }}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is mARkit:</Text>
          <Text style={styles.cardText}>
            mARkit is a creator tool and a viewer experience. Creators can build
            their own AR experience for viewers to find through online search or
            geolocation.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigate('ViewerDashboard')}>
          <Text style={styles.cardTitle}>mARkit for Viewers:</Text>
          <Text style={styles.cardText}>
            Go to your viewer dashboard and find portals that that interest you
            from private events, to merchant sales, and community projects.
            There is an AR experience for everyone.{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigate('CreatorDashboard', {userId: 1})}>
          <Text style={styles.cardTitle}>mARkit for Creators:</Text>
          <Text style={styles.cardText}>
            Go to your creator dashboard and search range of images to create a
            custom AR experience. If you don't find the one you want, upload
            your own and get started creating your experience.{' '}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: '5%',
    marginBottom: 20,
    marginLeft: '5%',
    height: '25%',
    width: '85%',
    shadowColor: 'black',
    shadowOpacity: 2,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  cardImage: {
    width: '85%',
    height: 300,
    resizeMode: 'cover',
  },
  cardTitle: {
    padding: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0B3142',
  },
  cardText: {
    padding: 5,
    fontSize: 16,
    color: '#0B3142',
    marginLeft: 10,
  },
});

export default withNavigation(Homepage);
