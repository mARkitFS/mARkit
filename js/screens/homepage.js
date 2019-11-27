import React from 'react';
import { View, Text, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class Homepage extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Homepage Bitch</Text>
        <Button
          title="Click to enter"
          onPress={() => navigate('ViewerDashboard')}
        />
      </View>
    );
  }
}

export default withNavigation(Homepage);
