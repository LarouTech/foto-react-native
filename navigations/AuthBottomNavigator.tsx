import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '../constant/colors';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { Ionicons } from '@expo/vector-icons';

interface AuthBottomNavigatorProps {}

const BottomTab = createBottomTabNavigator();

function AuthBottomNavigator(props: AuthBottomNavigatorProps) {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Theme.Colors.grey600,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: Theme.Colors.lightGrey
      }}
    >
      <BottomTab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="log-in"
              size={28}
              color={Theme.Colors.lightGrey}
            ></Ionicons>
          ),
          tabBarLabel: 'Login',
          tabBarLabelStyle: {
            color: Theme.Colors.lightGrey
          }
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="person-add"
              size={28}
              color={Theme.Colors.lightGrey}
            ></Ionicons>
          ),
          tabBarLabel: 'Signup',
          tabBarLabelStyle: {
            color: Theme.Colors.lightGrey
          }
        }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

export default AuthBottomNavigator;
