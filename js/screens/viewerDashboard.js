import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class ViewerDashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Some buttons</Text>
          <View>
            <Button title="Portal 1" />
            <Button title="Portal 2" />
          </View>
        </View>
      </View>
    );
  }
}

// export default withNavigation(ViewerDashboard);
