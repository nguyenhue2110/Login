import React, {useRef} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Slide from './Slide';
import Subslide from './Subslide';
import Dot from './Dot';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
interface ComponentNameProps {}
const BORDER_RADIUS = 75;
const Onboarding = () => {
  const scrollhander = useSharedValue(0);
  const slides = [
    {
      title: 'Picture1',
      color: '#BFEAF5',
      subtitle: 'Find Your Outfits',
      description: "Confused about your out fit? Don't worry!",
    },
    {
      title: 'Picture2',
      color: '#BEECC4',
      subtitle: 'Hear ir first Wear it First',
      description:
        'Hating the clothes in your wardrobe? Explore hundreds of outfit',
    },
    {
      title: 'Picture3',
      color: '#FFE4D9',
      subtitle: 'Your style, Yout Way',
      description:
        'Create your individual & unique style and look amazing everyay',
    },
    {
      title: 'Picture4',
      color: '#FFDDD',
      subtitle: 'Look Good, Feel Good',
      description:
        'Discover the latest trends in fashion and explore your personality',
    },
  ];
  const backgroundColor = interpolateColor(
    scrollhander.value,
    slides.map((_, i) => i * width),
    slides.map(slide => slide.color),
  );
  const animatedStyl = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollhander.value,
        [0, 1],
        ['#BFEAF5', '#BEECC4', '#FFE4D9', '#FFDDD'],
      ),
    };
  });

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollhander.value = event.contentOffset.x;
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -scrollhander.value}],
    };
  });
  const onFacebookButtonPress = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };
  const scroll = useRef<Animated.ScrollView>(null);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedStyl]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={scrollHandler}
          ref={scroll}>
          {slides.map(({title}, index) => (
            <Slide key={index} right={!!(index % 2)} {...{title}} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={{...StyleSheet.absoluteFillObject}}>
          <View style={[styles.footerContainer]}>
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <Dot
                  key={index}
                  currentIndex={scrollhander.value}
                  {...{index}}
                />
              ))}
            </View>
            <Animated.View
              style={[
                animatedStyles,
                {
                  width: width * slides.length,
                  flex: 1,
                  flexDirection: 'row',
                },
              ]}>
              {slides.map(({subtitle, description}, index) => (
                <Subslide
                  key={index}
                  last={index === slides.length - 1}
                  {...{subtitle, description}}
                  onPress={() => {
                    if (scroll.current) {
                      scroll.current.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                    if (index === 3) {
                      onFacebookButtonPress();
                    }
                  }}
                />
              ))}
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 0.61 * height,
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: 'row',
  },
});
export default Onboarding;
