import React, {Component} from 'react';
import {Text} from 'react-native';
import PushNotification from 'react-native-push-notification';


export default class Notification extends Component {
    componentDidMount() {
        PushNotification.configure({
            onNotification: function(notification) {
                console.log(notification)
            }
        })
    }

    render() {
        return <Text>Notification</Text>
    }
}