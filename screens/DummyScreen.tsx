import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../components/UI/ScreenContainer';

interface DummyScreenProps {}

function DummyScreen(props: DummyScreenProps) {
  return (
    <ScreenContainer>
      <View></View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

export default DummyScreen;
