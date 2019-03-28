import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default class LoginPage extends Component {
  constructor(props) {

   
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };

    this.loginHandler = this.loginHandler.bind(this)
  };

  

  renderButton() {
    if(this.state.isLoading){
      return (<ActivityIndicator/>)
    } else {
      return(
        < TouchableHighlight
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => this.loginHandler()}
      >
        <Text style={styles.loginText}>Log In</Text>
      </TouchableHighlight>
      )
    }
  }


  loginHandler() {
    
      this.setState({
        isLoading: true
      })

      axios
    .post("http://192.168.0.142:9000/login", {
      email: this.state.email,
      password: this.state.password
    })
    .then(res => {
      //if the token is received and success is true then user is authorised
      if (res.data.success) {
      //received jwt token is stored in local storage of app

        AsyncStorage.setItem("token", JSON.stringify(res.data.token));
        //once the jwt is stored in local storage of app, scanner button is displayed
        
        this.props.componentHandler()
      }else{
        this.setState({
          isLoading: false
        })
      }
    })
    
  }

  render() {
    return (
      <View>
        <Image style={styles.logo} source={{uri:"https://logo.clearbit.com/pes.edu"}}/>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#00b5ec',
    marginLeft:55,
    marginBottom:25
  }
});
