import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "../components";
import { nowTheme } from "../constants";

// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Trending from '../screens/Trending';
import Fashion from '../screens/Fashion';
import Category from '../screens/Category';
import Product from "../screens/Product";
import Gallery from "../screens/Gallery";
import NotificationsScreen from "../screens/Notifications";
import Agreement from "../screens/Agreement";
import About from "../screens/About";
import Privacy from "../screens/Privacy";
import Chat from "../screens/Chat";
import Cart from "../screens/Cart";
import Search from '../screens/Search';
import SettingsScreen from '../screens/Settings';

import Tenants from '../screens/Tenants';
import { useSelector, shallowEqual } from "react-redux";

import PersonalNotifications from "../screens/PersonalNotifications";
import SystemNotifications from "../screens/SystemNotifications";

// drawer
import CustomDrawerContent from './Menu';

// header for screens
import Header from '../components/Header';
import tabs from "../constants/tabs";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function NotificationsStack(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Personal") {
            iconName = "single";
          } else if (route.name === "System") {
            iconName = "paper";
          }
          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              family="NowExtra"
              size={22}
              color={color}
              style={{ marginTop: 10 }}
            />
          );
        }
      })}
      tabBarOptions={{
        activeTintColor: nowTheme.COLORS.PRIMARY,
        inactiveTintColor: nowTheme.COLORS.TIME,
        labelStyle: {
          fontFamily: "montserrat-regular"
        }        
      }}
    >
      <Tab.Screen name="Personal" component={PersonalNotifications} />
      <Tab.Screen name="System" component={SystemNotifications} />
    </Tab.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Agreement"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Privacy"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="About" scene={scene} navigation={navigation} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              scene={scene}
              navigation={navigation}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Register} options={{
        header: ({ navigation, scene }) => (
          <Header 
            title="Central"
            transparent
            iconColor={'#333'}
            navigation={navigation}
            scene={scene}
          />
        ),
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerTransparent: true
      }} />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
            <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              white
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
            <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Comments"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Shopping Cart"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen" initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ route }) =>({
          title: "Home Stack",
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          })
        }
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              title="Notifications"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) =>({
          title: "Comment Stack",
          header: ({ navigation, scene }) => (
            <Header
              title="Comments"
              back
              
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          unmountOnBlur: true
        })}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Change Organization" component={Tenants} />
    </Drawer.Navigator>
  );
}

export default OnboardingStack = props => {
  const [accessToken, isSignOut, tenantList] = useSelector(
    state => [ state.authUser.accessToken, state.authUser.isSignOut, state.authUser.tenantList ],
    shallowEqual,
  );

  let tenants;
  if (tenantList) {
    tenants = Object.keys(tenantList.TenantRelations).length;
  }

  let proScreen = (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Pro}
        option={{
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );

  let tenantScreen = (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Tenants" component={TenantStack} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );

  let appScreen = (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );

  if (accessToken) {
    if (!isSignOut) {
      if (tenants == 1) {
        return appScreen;
      } else {
        return tenantScreen;
      }
    } else {
      return proScreen;
    }
  } else {
    return proScreen;
  }
};

function TenantStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Tenants" component={Tenants} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  )
}