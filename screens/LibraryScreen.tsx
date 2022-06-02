import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/UI/ScreenContainer';
import Svg, { Circle } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StatusSpinner from '../components/UI/StatusSpinner';

interface LibraryScreenProps {}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function LibraryScreen(props: LibraryScreenProps) {
  return (
    <ScreenContainer>
      <React.Fragment></React.Fragment>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 125,
    width: 125,
    borderWidth: 5,
    borderRadius: 75,
    borderColor: 'green'
  }
});

export default LibraryScreen;
