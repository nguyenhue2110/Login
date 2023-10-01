import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TextInputProps extends RNTextInputProps {
  placehoder: string;
  icon: string;
  validator: (input: string) => boolean;
}
const Valid = true;
const Invalid = false;
const Pristine = null;
type InputState = typeof Valid | typeof Invalid | typeof Pristine;

const TextInput = ({icon, validator, ...props}: TextInputProps) => {
  const [state, setState] = useState<InputState>(Pristine);
  const [input, setInput] = useState('');
  const color =
    state === Pristine ? 'grey' : state === Valid ? 'primary' : 'danger';
  const validate = () => {
    const valid = validator(input);
    setState(valid);
  };
  const onChangeText = text => {
    setInput(text);
    if (state !== Pristine) {
      validate();
    }
  };
  return (
    <View style={styles.container}>
      <View style={{padding: 5}}>
        <Icon name="email" color="#4F8EF7" />
      </View>
      <View style={{flex: 1}}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          placeholder={props.placehoder}
          onBlur={validate}
          {...{onChangeText}}
        />
      </View>
      {(state !== Valid || state !== Invalid) && (
        <View
          style={[
            styles.viewCheck,
            {backgroundColor: state === Valid ? 'primary' : 'danger'},
          ]}>
          <AntDesign
            name={state === Valid ? 'checkcircle' : 'checkcircle'}
            color="#4F8EF7"
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
  },
  viewCheck: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextInput;
