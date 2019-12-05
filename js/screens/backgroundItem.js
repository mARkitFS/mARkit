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
        alignContent: 'space-between',
        margin: 3,
        justifyContent: 'space-between',
        display: 'flex',
      }}>
      <View>
        <Text>{item.name}</Text>
      </View>
      <View>
        <Image
          source={{uri: images.backgroundThumbnails[item.name].uri}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
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
