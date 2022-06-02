import { Image, StyleSheet, Text, View } from 'react-native';

interface PictureAvatarProps {
  imageUri: string;
}

function PictureAvatar(props: PictureAvatarProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.imageUri }} style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 100
  }
});

export default PictureAvatar;
