import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Base_Url } from '../api/Api';

export const getFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem("FCMToken")
    console.log("old Token", fcmToken);
    if (!fcmToken) {
        try {
            const fcmToken = await messaging().getToken()
            if (fcmToken) {
                await AsyncStorage.setItem("FCMToken", fcmToken)
                console.log("new Token", fcmToken);
            }
        }
        catch (error) {
            console.log("error", error);
        }
    }
    return fcmToken
}
export const onMessage = async (navigation, notification) => {
    const check = await AsyncStorage.getItem('status')
    if (check == 'loggedIn') {
        // const { title, body } = notification
        // title = "You have a new message"
        // body = "Click to view"

        let fcmToken = await getFCMToken()
        console.log("rrferg", fcmToken);
        const userId = await AsyncStorage.getItem('uid');
         fetch(`${Base_Url}/store-fcm`, {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, fcm: fcmToken }),
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("firease data", data);
                return data
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}



export const NotificationListener = (navigation) => {
    // background
    messaging().onNotificationOpenedApp(message => {
        const { notification } = message
        console.log("messaging().onNotificationOpenedApp", message);
        onMessage(navigation, notification)
        
        messaging().setBackgroundMessageHandler(async message => {
            onMessage(navigation, notification)
            console.log('Message handled in the background!', message);
        });
        // Quit State
        messaging()
            .getInitialNotification()
            .then(message => {
                if (message) {
                    onMessage(navigation, notification)
                    console.log('Notification caused app to open from quit state:', message)

                }
            })
    })

}