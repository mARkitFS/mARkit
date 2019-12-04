import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {images} from '../res/images';

const ElementItem = function(props) {
  const {item, addElement, removeElement} = props;
  return (
    <View key={item.id} style={{flex: 1, flexDirection: 'row'}}>
      {/* item name view */}
      <View>
        <Text>{item.name}</Text>
      </View>
      {/* image view */}
      <View style={{flex: 1}}>
        <Image
          source={{uri: images.element[item.name].url}}
          style={{
            width: 90,
            height: 90,
          }}
        />
      </View>
      <View>
        <Button title="add" onPress={() => addElement(item)} />
        <Button title="remove" onPress={() => removeElement(item.id)} />
      </View>
    </View>
  );
};

export default ElementItem;
