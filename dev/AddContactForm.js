import Constants from "expo-constants";
import React from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default class AddContactForm extends React.Component {
  state = {
    name: "",
    phone: "",
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name !== prevState.name ||
      this.state.phone !== prevState.phone
    ) {
      this.validateForm();
    }
  }

  getHandler = (key) => (val) => {
    // less efficient because you have to invoke the function n times
    this.setState({ [key]: val });
  };

  /*
  handleNameChange = (name) => {
    this.setState({ name });
  };

  handlePhoneChange = (phone) => {
    if (+phone >= 0 && phone.length <= 10) {
      // the + sign ensures that the phone is a number
      this.setState({ phone });
    }
  };
  */

  validateForm = () => {
    const names = this.state.name.split(" ");

    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      this.state.name.length >= 3 &&
      names.length >= 2 &&
      names[0] &&
      names[1]
    ) {
      this.setState({ isFormValid: true });
    } else {
      this.setState({ isFormValid: false });
    }
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={this.getHandler("name")}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.getHandler("phone")}
          placeholder="Phone"
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />
      </KeyboardAvoidingView>
    );
  }
}
