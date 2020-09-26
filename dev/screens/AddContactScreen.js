import React from "react";
import AddContactForm from "../AddContactForm";

export default class AddContactScreen extends React.Component {
  handleSubmit = (formState) => {
    this.props.navigation.navigate("ContactList", {
      contacts: [...this.props.route.params.contacts, formState],
    });
  };

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />;
  }
}
