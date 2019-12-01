import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';


class CreatorDashboard extends React.Component {
  render() {
    console.log('<<<<portalId', )
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, padding: 50, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Home"
          onPress={() => navigate('Homepage')}
        />
        <Button
          title="Create New Portal"
          onPress={() => navigate('CreatePortal', {userId: 1})}
        />
        <Text>Creator Dashboard Bitch</Text>
        <FlatList
          data={[
            {key: 1 ,value: 'Portal1'},
            {key: 2 ,value: 'Portal2'}
          ]}
          renderItem={({item}) => <Button
            title={item.value}
            onPress={() => navigate('ViewerDashboard')}
          />}
        />
      </View>
    );
  }
}

export default withNavigation(CreatorDashboard);
