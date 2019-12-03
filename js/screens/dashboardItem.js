import React, { Component } from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet
} from 'react-native';
import { images } from '../res/images';
import { withNavigation } from 'react-navigation';

class DashboardItem extends Component {
  render() {
    console.log(
      'images portal thumbnails in dashboard item: ',
      images.portalThumbnails
    );
    const image = images.portalThumbnails[this.props.item.name] ? (
      <Image
        style={styles.cardImage}
        source={images.portalThumbnails[this.props.item.name]}
      />
    ) : (
      <Image
        style={styles.cardImage}
        source={images.portalThumbnails.default}
      />
    );
    return (
    <View>
        <TouchableOpacity style = {styles.card}
          onPress={() => {
            this.props.navigation.navigate('SinglePortal', {
              portal: this.props.item,
              screen: this.props.screen,
              userId: this.props.userId
            });
          }}
        >
          {image}
          <Text style={styles.cardText}>{`Enter the ${this.props.item.name} portal!`}</Text>
        </TouchableOpacity>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B3142',
    marginBottom: 20,
    marginLeft: '5%',
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
    width: '100%',
    height: 150,
    resizeMode: 'cover'
  },
  cardText: {
    padding: 5,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }

})


export default withNavigation(DashboardItem);
