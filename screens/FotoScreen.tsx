import React, { useContext } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FotoMenu, FOTO_MENU_DATA } from '../components/fotoMenu/FotoMenuData';
import FotoMenuListItem from '../components/fotoMenu/FotoMenuListItem';
import Avatar from '../components/UI/Avatar/Avatar';
import FotoLogo from '../components/UI/FotoLogo';
import ScreenContainer from '../components/UI/ScreenContainer';
import { Theme } from '../constant/colors';
import { ProfileContext } from '../context/ProfileContextProvider';
import { AntDesign } from '@expo/vector-icons';

interface FotoScreenProps {}

function FotoScreen(props: FotoScreenProps) {
  const profileContext = useContext(ProfileContext);
  const renderFotoMenu = (itemData: ListRenderItemInfo<FotoMenu>) => {
    return <FotoMenuListItem itemData={itemData}></FotoMenuListItem>;
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.textBox}>
            <View style={styles.labelBox}>
              <AntDesign
                style={styles.icon}
                name="star"
                size={16}
                color="black"
              />

              <Text
                style={[styles.text, { textTransform: 'capitalize' }]}
              >{`${profileContext.profile.firstName} ${profileContext.profile.lastName}`}</Text>
            </View>

            <View style={styles.labelBox}>
              <AntDesign
                style={styles.icon}
                name="star"
                size={16}
                color="black"
              />

              <Text style={[styles.text, { textTransform: 'capitalize' }]}>
                {profileContext.profile.username}
              </Text>
            </View>

            <View style={styles.labelBox}>
              <AntDesign
                style={styles.icon}
                name="star"
                size={16}
                color="black"
              />
              <Text style={styles.text}>{profileContext.profile.email}</Text>
            </View>

            <View style={styles.labelBox}>
              <AntDesign
                style={styles.icon}
                name="star"
                size={16}
                color="black"
              />
              <Text style={styles.text}>
                {profileContext.profile.birthdate}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.avatarContainer}>
          <Avatar></Avatar>
        </View>

        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={FOTO_MENU_DATA}
          renderItem={renderFotoMenu}
          style={styles.list}
        ></FlatList>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    color: Theme.Colors.yellow500
  },
  labelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 14,
    paddingVertical: 2,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginBottom: 40
  },
  innerContainer: {
    width: '100%',
    minHeight: 175,
    marginTop: 150,
    backgroundColor: Theme.Colors.grey200,
    position: 'relative',
    // borderRadius: 5,
    padding: 20,
    justifyContent: 'flex-end',
    borderTopEndRadius: 75,
    borderTopStartRadius: 75
  },
  textBox: {
    width: '100%',
    paddingTop: 80,
    justifyContent: 'flex-end',
    minHeight: 150
  },
  list: {
    width: '100%',
    marginTop: 10
  },
  avatarContainer: {
    marginVertical: 45,
    position: 'absolute',
    top: 0
  }
});

export default FotoScreen;
