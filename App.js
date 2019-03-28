import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import LoginPage from './android/app/src/components/LoginPage';
import HomePage from './android/app/src/components/HomePage';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      show: ''
    }

   
  
    this.componentHandler = this.componentHandler.bind(this)
    this.logOutHandler = this.logOutHandler.bind(this)

  }

  componentDidMount() {
    AsyncStorage.getItem('token')
    .then(token => {
      if(token){
      return  this.setState({show:'HomePage'})
      }
      this.setState({show: 'LoginPage'})
      
    })
  }

  componentHandler() {

    this.setState({
      show: 'HomePage',
    })
  }

  renderComponent() {
    switch(this.state.show){
        case 'LoginPage' : return (<View style={styles.container}><LoginPage componentHandler={this.componentHandler}/></View>);
        case 'HomePage' : return ( <HomePage logOutHandler={this.logOutHandler}/>);
        default : return (<ActivityIndicator style={styles.container}/>)
    }
  }

  logOutHandler() {
    AsyncStorage.clear()
    this.setState({
      show: 'LoginPage'
    })
  }

  

    render() {
      return(this.renderComponent())
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  }
})

export default App;
