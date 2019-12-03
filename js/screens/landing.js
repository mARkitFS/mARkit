import React from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { images } from '../res/images'
const Landing = (props) => {
  const { navigate } = props.navigation;
  return (
    <View style = { styles.container } >
    <ImageBackground  style= { styles.backgroundImage }
    source={{uri:'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/mARkit%20(1).jpg'}} >
      <TouchableOpacity style = {styles.card}
        onPress={() => {
          navigate('Homepage');
        }}
      >
          <Image style={styles.cardImage} source = {{uri: 'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/enter.jpeg'}}></Image>

        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "orange"
  },
  button:{
    fontSize: 20,
    color: 'green',
    width: '50%'
  },
  logoContainer:{
      alignItems: "center",
  },
  logoText: {
      fontSize: 24,
      fontWeight: '600',
      color: 'white'
  },
  logoDescription:{
      fontSize: 15,
      fontWeight: '600',
      color: 'white'
  },
  backgroundImage:{
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: "center",
      alignItems: "center",
      opacity: 1
  },
    card: {
      backgroundColor: '#fff',
      marginTop: 300,
      marginBottom: 20,
      marginRight: '50%',
      width: '25%',
      height: '5%',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 1,
      shadowOffset: {
        width: 3,
        height: 2
      }
    },
    cardImage: {
      width: '150%',
      height: 50,
      resizeMode: 'cover'
    },
    cardText: {
      padding: 10,
      fontSize: 16
    }

  })



export default withNavigation(Landing)
