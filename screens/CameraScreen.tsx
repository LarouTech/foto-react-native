import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CameraComponent from '../components/camera/Camera';

interface FaceBounds {
  x: number;
  y: number;
  height: number;
  width: number;
}

interface CameraScreenProps {}

function CameraScreen(props: CameraScreenProps) {
  return (
    <View style={styles.container}>
      <CameraComponent></CameraComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CameraScreen;
