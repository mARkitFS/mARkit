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

export default withNavigation(Homepage);
