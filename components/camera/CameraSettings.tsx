import { StyleSheet, View } from 'react-native';
import { Theme } from '../../constant/colors';
import CameraControl, { IconType } from './CameraControl';

interface CameraSettingsProps {
  onPressFlash: (state: boolean) => void;
  onZoom: (state: boolean) => void;
  onFacesBounds: (state: boolean) => void;
  onPressFilter: (state: boolean) => void;
}

function CameraSettings(props: CameraSettingsProps) {
  const onPressFlashHandler = (state: boolean) => {
    props.onPressFlash(state);
  };

  const onZoomHandler = (state: boolean) => {
    props.onZoom(state);
  };

  const onFacesBoundsHandler = (state: boolean) => {
    props.onFacesBounds(state);
  };

  const onPressFilterHandler = (state: boolean) => {
    props.onPressFilter(state);
  };

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.leftContainer}>
        <CameraControl
          truthyIcon="flash"
          falsyIcon="flash-off"
          onPress={onPressFlashHandler}
          type={IconType.Ionicons}
          style={{ marginRight: 20 }}
        ></CameraControl>

        <CameraControl
          truthyIcon="remove-circle"
          falsyIcon="face"
          onPress={onFacesBoundsHandler}
          type={IconType.MaterialIcons}
        ></CameraControl>
      </View>

      <View style={styles.rightContainer}>
        <CameraControl
          onPress={onZoomHandler}
          falsyIcon={'zoom'}
          truthyIcon="undo"
          type={IconType.Fontisto}
          style={{ marginRight: 20 }}
        ></CameraControl>

        <CameraControl
          truthyIcon="md-color-filter-outline"
          falsyIcon="md-color-filter"
          onPress={onPressFilterHandler}
          type={IconType.Ionicons}
        ></CameraControl>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: Theme.Colors.grey900,
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CameraSettings;
