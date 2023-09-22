import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;
interface SlideProps {
  title: string;
  right: boolean;
}

const Slide = ({title, right}: SlideProps) => {
  const transform = [
    {translateY: (SLIDE_HEIGHT - 100) / 2},
    {translateX: right ? width / 2 - 50 : -width / 2 + 50},
    {rotate: right ? '-90deg' : '90deg'},
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, {transform}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
  },
  title: {
    // fontFamily: 'SFProText-Bold',
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
    lineHeight: 80,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
    // transform: [{translateY: (SLIDE_HEIGHT - 100) / 2},{translateX: -width/2}],
  },
});
export default Slide;
