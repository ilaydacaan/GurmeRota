import React from 'react';
import {TextInput} from 'react-native';


const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: '#006A42', paddingHorizontal: 10, width: '65%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10,right:25}}
      placeholderTextColor={'#006A42'}></TextInput>
  );
};

export default Field;