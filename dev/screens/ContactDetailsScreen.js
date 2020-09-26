import React from "react";
import { Button, Text, View } from "react-native";

export default class ContactDetailsScreen extends React.Component {
  goToRandomContact = () => {
    const contacts = this.props.route.params.contacts;
    const phone = this.props.route.params.phone;
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }
    //this.props.navigation.navigate("ContactDetails", { ...randomContact }); // will stay on the same screen
    this.props.navigation.push("ContactDetails", { ...randomContact }); // will stack
  };

  render() {
    return (
      <View>
        <Text>{this.props.route.params.name}</Text>
        <Text>{this.props.route.params.phone}</Text>
        <Button title="Go to random contact" onPress={this.goToRandomContact} />
      </View>
    );
  }
}
