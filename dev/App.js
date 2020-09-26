import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import contacts from "./contacts";
import AddContactScreen from "./screens/AddContactScreen";
import ContactDetailsScreen from "./screens/ContactDetailsScreen";
import ContactListScreen from "./screens/ContactListScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();

class ContactsTab extends React.Component {
  state = {
    contacts: contacts,
  };

  render() {
    return (
      <Stack.Navigator
        initialRouteName="ContactList"
        screenOptions={{ headerTintColor: "#a41034" }}
      >
        <Stack.Screen
          name="ContactList"
          component={ContactListScreen}
          initialParams={{ contacts }}
          options={{
            title: "Contacts",
          }}
        />

        <Stack.Screen
          name="AddContact"
          component={AddContactScreen}
          initialParams={{ contacts }}
          options={{
            title: "Add Contact",
          }}
        />

        <Stack.Screen
          name="ContactDetails"
          component={ContactDetailsScreen}
          initialParams={{ contacts }}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    );
  }
}

const Tab = createBottomTabNavigator();
const MainNavigator = () => (
  <Tab.Navigator tabBarOptions={{ activeTintColor: "#a41034" }}>
    <Tab.Screen
      name="Contacts"
      component={ContactsTab}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="contacts" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-settings"
            color={color}
            size={30}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  onLogIn = () => {
    this.setState({ isLoggedIn: true });
  };

  render() {
    return (
      <NavigationContainer>
        {this.state.isLoggedIn ? (
          <MainNavigator />
        ) : (
          <LoginScreen onLogIn={this.onLogIn} />
        )}
      </NavigationContainer>
    );
  }
}
