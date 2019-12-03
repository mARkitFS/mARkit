import React, { Component } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import PreviewImage from './previewImage';
import { images } from '../res/images';
import axios from 'axios';

export default class PreviewPortal extends Component {
  constructor() {
    super();
    this.state = {
      saveButton: 'Save',
      items: [],
      portal: {},
      text: '',
      userId: 0
    };
  }

  componentDidMount() {
    let items = this.props.navigation.state.params.items;
    let userId = this.props.navigation.state.params.userId;
    this.setState({
      items: items,
      userId: userId
    });
  }

  async addPortal() {
    let portalObj = {
      name: this.state.text,
      type: 'custom',
      imageURL:
        'https://raw.githubusercontent.com/mARkitFS/mARkit/master/js/res/portal.png',
      backgroundId: this.state.items[0].id,
      userId: this.state.userId
    };
    try {
      const newPortal = await axios.post(
        'https://vast-falls-27580.herokuapp.com/api/portals/add',
        portalObj
      );
      const { data } = await axios.get(
        `https://vast-falls-27580.herokuapp.com/api/portals/${newPortal.data.id}`
      );

      console.log('newPortal:>>>>', newPortal.data);
      this.addPortels(newPortal.data.id);
      this.addElementProps(newPortal.data.id);
      this.setState({
        portal: data,
        saveButton: `Portal ${data.name} created`
      });
    } catch (err) {
      console.log(err);
    }
  }

  addElementProps(portalId) {
    let elementArr = this.state.items
      .filter(el => el.type != 'background')
      .map(el => el.id);
    elementArr.forEach(async el => {
      let elementPropsObj = {
        elementId: el,
        portalId: portalId,
        scale: [0.01, 0.01, 0.01],
        position: [1, 1.5, -5]
      };
      try {
        const newElementProps = await axios.post(
          'https://vast-falls-27580.herokuapp.com/api/elementprops/add',
          elementPropsObj
        );
        console.log('newElementProps: ', newElementProps);
      } catch (error) {}
    });
  }

  addPortels(portalId) {
    let elementArr = this.state.items
      .filter(el => el.type != 'background')
      .map(el => el.id);
    let setElementArr = new Set(elementArr);
    setElementArr.forEach(async el => {
      let portelObj = {
        elementId: el,
        portalId: portalId
      };
      try {
        const newPortel = await axios.post(
          'https://vast-falls-27580.herokuapp.com/api/portels/add',
          portelObj
        );
        console.log('newPortel: ', newPortel);
      } catch (error) {}
    });
  }

  render() {
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.loader}>
        <Text>Preview your portal selections: </Text>
        <TextInput
          style={{ height: 40, width: 150 }}
          placeholder="Portal name"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title={this.state.saveButton}
          onPress={() => {
            console.log('state: ', this.state);
            this.addPortal();
          }}
        />
        <Button
          title="View Portal"
          onPress={() => {
            console.log('portal id when navigating', this.state.portal.id);
            this.props.navigation.navigate('SinglePortal', {
              portal: this.state.portal,
              userId: this.state.userId,
              screen: 'CreatorDashboard'
            });
          }}
        />
        <FlatList
          style={styles.container}
          data={this.state.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <PreviewImage item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#F5FCFF'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
