import { StyleSheet, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Theme } from '../../constant/colors';

interface DetectFacesBoundsProps {}

function DetectFacesBounds(props: DetectFacesBoundsProps) {
  return (
    <SimpleLineIcons
      style={{ marginRight: 20 }}
      name="frame"
      size={20}
      color={Theme.Colors.primary100}
    ></SimpleLineIcons>
  );
}

const styles = StyleSheet.create({});

export default DetectFacesBounds;
