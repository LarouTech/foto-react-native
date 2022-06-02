import Slider from '@react-native-community/slider';
import { StyleSheet, Text } from 'react-native';
import { Theme } from '../../constant/colors';

interface ZoomSliderProps {
  onZoomValueChange: (value: number) => void;
}

function ZoomSlider(props: ZoomSliderProps) {
  return (
    <Slider
      tapToSeek={true}
      thumbTintColor={Theme.Colors.grey}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor={Theme.Colors.primary100}
      maximumTrackTintColor={Theme.Colors.grey}
      style={{ width: '80%' }}
      onValueChange={props.onZoomValueChange}
    ></Slider>
  );
}

const styles = StyleSheet.create({});

export default ZoomSlider;
