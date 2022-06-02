import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from '../../../constant/colors';

interface UnknowAvatarProps {}

function UnknowAvatar(props: UnknowAvatarProps) {
  return (
    <View style={styles.unknowUser}>
      <FontAwesome5 name="user-ninja" size={115} color={Theme.Colors.grey800} />
      <Text style={styles.questionMark}>?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  questionMark: {
    position: 'absolute',
    top: 25,
    right: 40,
    fontSize: 54,
    fontWeight: 'bold',
    color: Theme.Colors.primary700
  },
  unknowUser: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default UnknowAvatar;
