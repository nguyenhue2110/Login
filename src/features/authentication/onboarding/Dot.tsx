import React, {Component} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
interface DotProps {
  index: number;
  currentIndex: Animated.Node<number>;
}
const Dot = ({index, currentIndex}) => {
  const opacity = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentIndex,
        [index - 1, index, index + 1],
        [0.5, 1, 0.5],
      ),
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      currentIndex,
      [index - 1, index, index + 1],
      [1, 1.125, 1],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      transform: [{scale: scale}],
    };
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#2CB9B0',
          width: 8,
          height: 8,
          borderRadius: 4,
          margin: 4,
        },
        animatedStyles,
      ]}
    />
  );
};

export default Dot;
