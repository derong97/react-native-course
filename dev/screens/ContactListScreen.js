import Constants from "expo-constants";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import SectionListContacts from "../SectionListContacts";

export default class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
  };

  toggleContacts = () => {
    this.setState((prevState) => ({ showContacts: !prevState.showContacts }));
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          color="#a41034"
          onPress={() => {
            this.props.navigation.navigate("AddContact", {
              contacts: this.props.route.params.contacts,
            });
          }}
        />
      ),
    });

    return (
      <View style={styles.container}>
        {/*<Button title="toggle contacts" onPress={this.toggleContacts} /> */}
        {this.state.showContacts && (
          <SectionListContacts
            contacts={this.props.route.params.contacts}
            onSelectContact={(contact) => {
              this.props.navigation.navigate("ContactDetails", {
                phone: contact.phone,
                name: contact.name,
              });
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
});
