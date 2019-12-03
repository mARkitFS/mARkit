import React from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';

const Landing = (props) => {
  return (
    <View style = { styles.container } >
    <ImageBackground  style= { styles.backgroundImage }
    source={{uri:'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/mARkit%20(1).jpg'}} >
      <View style= { styles.logoContainer }>
        <View style = { styles.container }>
        <Button
          style = { styles.logoText }
          title="Enter"
          onPress={() => navigate('Homepage')}
        />
        </View>
      </View>
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
  }
});

export default withNavigation(Landing)
