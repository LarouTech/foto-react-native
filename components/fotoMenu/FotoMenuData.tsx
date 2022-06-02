import { MaterialIcons } from '@expo/vector-icons';

export interface FotoMenu {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export enum MenuItemName {
  'profile' = 'profile',
  'library' = 'library',
  'settings' = 'settings',
  'logout' = 'logout'
}

export const FOTO_MENU_DATA: FotoMenu[] = [
  {
    id: '1',
    name: MenuItemName.profile,
    icon: 'account-circle'
  },
  {
    id: '2',
    name: MenuItemName.library,
    icon: 'local-library'
  },
  {
    id: '3',
    name: MenuItemName.settings,
    icon: 'settings'
  },
  {
    id: '4',
    name: MenuItemName.logout,
    icon: 'logout'
  }
];
