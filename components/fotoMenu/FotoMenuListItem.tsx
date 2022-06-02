import {
  Dimensions,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Theme } from '../../constant/colors';
import { FotoMenu, MenuItemName } from './FotoMenuData';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useLayoutEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { AuthService } from '../../services/authServices';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../../context/ProfileContextProvider';

interface FotoMenuListItemProps {
  itemData: ListRenderItemInfo<FotoMenu>;
}

const authService = new AuthService();

function FotoMenuListItem(props: FotoMenuListItemProps) {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const navigation = useNavigation();

  const onLogoutHandler = async (): Promise<void> => {
    profileContext.onClearProfile();
    authContext.onLogout();
    return await authService.onLogout().then(() => authContext.onLogout());
  };

  const onPressMenuItem = (item: FotoMenu) => {
    switch (item.name) {
      case MenuItemName.profile:
        navigation.navigate('Profile' as never);
        break;
      case MenuItemName.library:
        navigation.navigate('Library' as never);
        break;

      case MenuItemName.settings:
        navigation.navigate('Settings' as never);
        break;

      case MenuItemName.logout:
        onLogoutHandler();
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.box}>
      <Pressable
        onPress={onPressMenuItem.bind(null, props.itemData.item)}
        style={({ pressed }) => {
          if (!pressed) {
            return styles.container;
          }

          return pressed && styles.pressedContainer;
        }}
      >
        <MaterialIcons
          name={props.itemData.item.icon}
          size={36}
          color={Theme.Colors.primary100}
          style={styles.icon}
        ></MaterialIcons>
        <Text style={styles.text}>{props.itemData.item.name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center'
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // borderRadius: 10,
    // paddingLeft: '18%',
    backgroundColor: Theme.Colors.grey200,

    elevation: 3,
    shadowColor: Theme.Colors.lightGrey,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 30
  },
  pressedContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // borderRadius: 10,
    // paddingLeft: '18%',
    backgroundColor: Theme.Colors.grey200,
    elevation: 1,
    shadowColor: Theme.Colors.lightGrey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 2,
    opacity: 0.7,
    marginTop: 30
  },
  icon: {
    marginRight: 15,
    color: Theme.Colors.primary200
  },
  text: {
    fontSize: 24,
    textTransform: 'capitalize',
    letterSpacing: 4,
    fontWeight: '700',
    color: Theme.Colors.grey600
  }
});

export default FotoMenuListItem;
