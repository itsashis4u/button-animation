import React, {useRef} from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTouchableHighlight =
  Animated.createAnimatedComponent(TouchableHighlight);

function Button(props: ButtonProps) {
  const {children, onPress, style} = props;
  const isAndroid = Platform.OS === 'android';

  if (isAndroid) {
    return (
      <AnimatedTouchableHighlight
        activeOpacity={1}
        underlayColor="transparent"
        onPress={onPress}
        style={style}>
        {children}
      </AnimatedTouchableHighlight>
    );
  } else {
    return (
      <AnimatedTouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={style}>
        {children}
      </AnimatedTouchableOpacity>
    );
  }
}

const Home = () => {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePress() {
    Animated.timing(scale, {
      toValue: 1.2,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  }

  const opacity = scale.interpolate({
    inputRange: [0, 1, 1.2],
    outputRange: [0.5, 1, 1],
  });

  const rotateX = scale.interpolate({
    inputRange: [0, 1, 1.2],
    outputRange: ['360deg', '0deg', '0deg'],
  });

  const animatedStyle = {
    opacity,
    transform: [
      {
        scale,
      },
      {
        rotateX,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button style={[styles.button, animatedStyle]} onPress={handlePress}>
        <Text style={styles.buttonText}>Home</Text>
      </Button>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonText: {fontSize: 24, color: 'black'},
  button: {
    borderColor: 'grey',
    backgroundColor: '#efefef',
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
