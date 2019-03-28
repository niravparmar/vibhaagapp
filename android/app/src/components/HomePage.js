import React, {Component} from 'react';
import {AppState} from 'react-native'
import Profile from './Profile';
import Notifications from './Notifications'
import QRSCanner from './QRScanner'
import {DrawerNavigator} from 'react-navigation';
import PushNotification from 'react-native-push-notification';



class HomePage extends Component {

  constructor(props) {
    super(props)

    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  componentDidMount() {
    AppState.addEventListener('change',this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.addEventListener('change',this.handleAppStateChange)
  }


  handleAppStateChange(appState) {
    if(appState == 'background'){
      PushNotification.localNotificationSchedule({
        message: "Well Done!",
        date: new Date(Date.now() + (5 * 1000))
      })
    }
    // return null
  }

  

    render() {

        return (<Container screenProps={this.props}/>)
    }
}

const Container = DrawerNavigator({
    Home: {
      screen: Profile
    },
    QRSCanner: {
        screen: QRSCanner
    },
    Notifications: {
      screen: Notifications
    }

  })

  export default HomePage;