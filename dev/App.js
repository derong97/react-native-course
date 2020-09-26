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
import LoadingScreen from "./screens/LoadingScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchUsers } from "./api";

const Stack = createStackNavigator();

class ContactsTab extends React.Component {
  state = {
    dataIsReturned: false,
    contacts: null,
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const results = await fetchUsers();
    this.setState({ contacts: results });
    this.setState({ dataIsReturned: true });
  };

  render() {
    if (!this.state.dataIsReturned)
      return (
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      );

    return (
      <Stack.Navigator
        initialRouteName="ContactList"
        screenOptions={{ headerTintColor: "#a41034" }}
      >
        <Stack.Screen
          name="ContactList"
          component={ContactListScreen}
          initialParams={{ contacts: this.state.contacts }}
          options={{
            title: "Contacts",
          }}
        />

        <Stack.Screen
          name="AddContact"
          component={AddContactScreen}
          initialParams={{ contacts: this.state.contacts }}
          options={{
            title: "Add Contact",
          }}
        />

        <Stack.Screen
          name="ContactDetails"
          component={ContactDetailsScreen}
          initialParams={{ contacts: this.state.contacts }}
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

  loginStatus = (success) => {
    this.setState({ isLoggedIn: success });
  };

  render() {
    return (
      <NavigationContainer>
        {this.state.isLoggedIn ? (
          <MainNavigator />
        ) : (
          <LoginScreen loginStatus={this.loginStatus} />
        )}
      </NavigationContainer>
    );
  }
}
