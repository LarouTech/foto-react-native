import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Theme } from '../../constant/colors';
import CustomBtn from '../UI/CustomBtn';
import { Ionicons } from '@expo/vector-icons';

interface BottomControlsProps {
  onTakePicture: () => void;
  onFlip: (state: boolean) => void;
}

function BottomControls(props: BottomControlsProps) {
  const [isFlip, setFlipState] = useState<boolean>(false);

  const onTakePictureHanlder = () => {
    props.onTakePicture();
  };

  const onPressFlipHandler = () => {
    if (isFlip === true) {
      props.onFlip(false);
      setFlipState(false);
    } else {
      props.onFlip(true);
      setFlipState(true);
    }
  };

  return (
    <React.Fragment>
      <CustomBtn
        btnTextStyle={{ fontSize: 14 }}
        btnStyle={{
          backgroundColor: Theme.Colors.lightGrey,
          maxWidth: 70,
          minWidth: 70,
          maxHeight: 70,
          minHeight: 70,
          borderRadius: 50,
          borderWidth: 5,
          borderColor: Theme.Colors.primary100
        }}
        name=""
        onPress={onTakePictureHanlder}
      ></CustomBtn>

      <Ionicons
        onPress={onPressFlipHandler}
        style={styles.bottomPanel}
        name="camera-reverse"
        size={40}
        color={Theme.Colors.lightGrey}
      ></Ionicons>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  bottomPanel: {
    position: 'absolute',
    bottom: '1%',
    right: 20,
    opacity: 0.7,
    marginRight: 20
  }
});

export default BottomControls;
