import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Base_Url } from '../api/Api';

export const onMessage = async (navigation, notification) => {
    const check = await AsyncStorage.getItem('status')
    if (check == 'loggedIn') {
        const { title, body } = notification
        title = "You have a new message"
        body = "Click to view"
        navigation.navigate("BottomNavigation")


        // console.log("pressed by notification", notification);
        // notification?.title === "You have a new message" &&
        //     navigation.navigate("BottomNavigation")

        // const userId = await AsyncStorage.getItem('uid');
        // await fetch(`${Base_Url}/get-inbox`, {
        //     method: 'POST',
        //     body: JSON.stringify({ user_id: userId }),
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("OnMessage Data", data);
        //         data.buying.filter(val => {
        //             val.read === 'no' ?
        //                 navigation.navigate("BottomNavigation", { message: "Inbox" })
        //                 : navigation.navigate("BottomNavigation", { message: "Home" })

        //         })
        //         data.selling.filter(val => {
        //             val.read === 'no' ?
        //                 navigation.navigate("BottomNavigation", { message: "Inbox" })
        //                 : navigation.navigate("BottomNavigation", { message: "Home" })

        //         })
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })
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