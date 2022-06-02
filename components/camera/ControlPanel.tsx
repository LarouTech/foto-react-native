import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../constant/colors';
import CustomBtn from '../UI/CustomBtn';
import CameraSettings from './CameraSettings';
import ZoomSlider from './ZoomSlider';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import Filters, { FilterType } from './Filters';
import BottomControls from './BottomControls';

interface ControlPanelProps {
  onPressFlash: (state: boolean) => void;
  onTakePicture: () => void;
  onZoomValueChange: (value: number) => void;
  onFlip: (value: boolean) => void;
  onFacesBounds: (state: boolean) => void;
  onSetFilter: (filterType: FilterType) => void;
}

function ControlPanel(props: ControlPanelProps) {
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [isFilter, setFilterState] = useState<boolean>(false);

  const onPressFlashHandler = (state: boolean) => {
    props.onPressFlash(state);
  };

  const onTakePictureHanlder = () => {
    props.onTakePicture();
  };

  const onZoomHandler = (state: boolean) => {
    setIsZoom(state);
  };

  const onZoomValueChangeHandler = (value: number) => {
    props.onZoomValueChange(value);
  };

  const onPressFlipHandler = (state: boolean) => {
    props.onFlip(state);
  };

  const onFacesBoundsHandler = (state: boolean) => {
    props.onFacesBounds(state);
  };

  const onPressFilterHandler = (state: boolean) => {
    setFilterState(state);
  };

  const onSetFilterHandler = (filterType: FilterType) => {
    props.onSetFilter(filterType);
  };

  return (
    <View style={styles.controlPanel}>
      <View style={styles.settings}>
        <CameraSettings
          onZoom={onZoomHandler}
          onPressFlash={onPressFlashHandler}
          onFacesBounds={onFacesBoundsHandler}
          onPressFilter={onPressFilterHandler}
        ></CameraSettings>

        {isZoom ? (
          <ZoomSlider onZoomValueChange={onZoomValueChangeHandler}></ZoomSlider>
        ) : null}
      </View>

      {isFilter ? (
        <Filters onSetFilter={onSetFilterHandler}></Filters>
      ) : (
        <BottomControls
          onFlip={onPressFlipHandler}
          onTakePicture={onTakePictureHanlder}
        ></BottomControls>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    width: '100%',
    alignItems: 'center'
  },
  extendedPanel: { flex: 1 },
  controlPanel: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  }
});

export default ControlPanel;
