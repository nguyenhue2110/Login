import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;
import {Button} from '../../../components';

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const Subslide = ({subtitle, description, last, onPress}: SubslideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        {...{onPress}}
        label={last ? 'Login FaceBook' : 'Next'}
        variant={last ? 'primary' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
  },

  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0C0D34',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    color: '#0C0D34',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
  },
});
export default Subslide;
