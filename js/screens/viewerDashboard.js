import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

const dummyPortals = [
  {
    name: 'PartyEvent',
    backgroundId: 2,
    type: 'custom',
    imageURL:
      'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal.png',
  },
  {
    name: 'BeachVacation',
    backgroundId: 1,
    type: 'custom',
    imageURL:
      'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal.png',
  },
];

// creating a row class to instantiate a row from
export default class Table extends Component {
  renderRow(portal) {
    return (
      <View style={{ flex: 1, alignSelf: 'stretch', maxHeight: 50 }}>
        <Text>{portal.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        {dummyPortals.map(portal => {
          return this.renderRow(portal);
        })}
      </View>
    );
  }
}

// export default class ViewerDashboard extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <View>
//           <Text>Some buttons</Text>
//           <View>
//             <Button
//               title="Portal 1"
//               onPress={() => {
//                 this.props.navigation.navigate("ViroApp", {
//                   templateId: 1,
//                 });
//               }}
//             />
//             <Button
//               title="Portal 2"
//               onPress={() => {
//                 this.props.navigation.navigate("ViroApp", {
//                   templateId: 2,
//                 });
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export default withNavigation(ViewerDashboard);
