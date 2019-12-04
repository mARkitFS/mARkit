import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {images} from '../res/images';

const BackgroundItem = function(props) {
  const {item, addBackground, removeBackground} = props;
  return (
    <View
      key={item.id}
      style={{
        flex: 1,
        flexDirection: 'row',
        margin: 3,
      }}>
      <View>
        <Text>{item.name}</Text>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={{uri: images.backgroundThumbnails[item.name].uri}}
          style={{
            width: 70,
            height: 70,
          }}
        />
      </View>
      <View>
        <Button title="add" onPress={() => addBackground(item)} />
        <Button title="remove" onPress={() => removeBackground()} />
      </View>
    </View>
  );
};

export default BackgroundItem;
