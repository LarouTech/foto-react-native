import { Camera, FaceDetectionResult } from 'expo-camera';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import FacesBounds, { FaceBounds } from './FacesBounds';
import ControlPanel from './ControlPanel';
import { FilterType } from './Filters';
import * as MediaLibrary from 'expo-media-library';
import { ProfileContext } from '../../context/ProfileContextProvider';

interface CameraComponenProps {}

function CameraComponent(props: CameraComponenProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoomValue, setZoomValue] = useState(0);
  const [facesBounds, setFacesBounds] = useState<FaceBounds[]>([]);
  const [isFlash, setFlash] = useState<boolean>(false);
  const [isBounds, setIsBounds] = useState<boolean>(true);
  const [whiteBalance, setWhiteBalnce] = useState<FilterType>(FilterType.auto);

  let camera: Camera;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.log(error);
      }

      const { status: mediaLibraryStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();

    return () => {};
  }, []);

  const onFlipHandler = (): void => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onTakePictureHanlder = async (): Promise<void> => {
    let picture = null;
    try {
      picture = await camera!.takePictureAsync();
    } catch (error) {
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(picture.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const onZoomSliderChange = (value: number): void => {
    setZoomValue(+(value / 100));
  };

  const onFaceDetectedHandler = (facesResult: FaceDetectionResult): void => {
    if (isBounds === true) {
      setFacesBounds(
        facesResult.faces.map((face) => {
          return {
            x: face.bounds.origin.x,
            y: face.bounds.origin.y,
            height: face.bounds.size.height,
            width: face.bounds.size.width
          } as FaceBounds;
        })
      );
    } else {
      setFacesBounds(
        facesResult.faces.map((face) => {
          return {
            x: null!,
            y: null!,
            height: null!,
            width: null!
          } as FaceBounds;
        })
      );
    }
  };

  const onPressFlashHandler = (state: boolean): void => {
    setFlash(state);
  };

  const onFacesBoundsHandler = (state: boolean): void => {
    setIsBounds(state);
  };

  const onSetFilterHandler = (filterType: FilterType): void => {
    setWhiteBalnce(filterType);
  };

  return (
    <Camera
      whiteBalance={whiteBalance}
      flashMode={isFlash ? 'on' : 'off'}
      zoom={zoomValue}
      ref={(r) => {
        camera = r!;
      }}
      style={styles.camera}
      type={cameraType}
      onFacesDetected={onFaceDetectedHandler}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.accurate,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
        minDetectionInterval: 0,
        tracking: true
      }}
    >
      <FacesBounds facesBounds={facesBounds}></FacesBounds>

      <ControlPanel
        onFlip={onFlipHandler}
        onPressFlash={onPressFlashHandler}
        onTakePicture={onTakePictureHanlder}
        onZoomValueChange={onZoomSliderChange}
        onFacesBounds={onFacesBoundsHandler}
        onSetFilter={onSetFilterHandler}
      ></ControlPanel>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1
  }
});

export default CameraComponent;
