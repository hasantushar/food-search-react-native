import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/login/login";
import HomeScreen from "../screens/home/home";
import ArticleDetails from "../screens/articleDetails/articleDetails";

const Stack = createStackNavigator();
const HeaderStyle = {
  headerStyle: {
    backgroundColor: "#222E94",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
};
const AppNavigations = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ ...HeaderStyle, title: "Central" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ ...HeaderStyle, title: "Central" }}
      />
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{ ...HeaderStyle, title: "Article Details" }}
      />      
    </Stack.Navigator>
  );
};

export default AppNavigations;
