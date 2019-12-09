import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {images} from '../res/images';

const ElementItem = function(props) {
  const {item, addElement, removeElement} = props;
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
      {/* item name view */}
      <View>
        <Text>{item.name}</Text>
      </View>
      {/* image view */}
      <View>
        <Image
          source={{uri: images.element[item.name].url}}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
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
