import OneSignal from "react-native-onesignal";
import axios from "axios";
import { getUniqueId } from 'react-native-device-info';

const getAppId = () => {
  axios.get('http://onsite.amsoftonline.net:5009/MayRelease2021/CentralApi/api/settings?record_type=OneSignal')
    .then(res=>{
      console.log("APP_ID found...");
      // console.log(res);
      let APP_ID = JSON.parse(res.data[0].json_meta_data).AppId;
      console.log("App ID : "+APP_ID);
      let token = JSON.parse(res.data[0].json_meta_data).Token;
      console.log("Token : "+token);
      OneSignal.setLogLevel(6, 0);
      OneSignal.setAppId(APP_ID);
    })
    .catch(err=>{
      console.log("Did not found any APP_ID..."+err);
    });
};

const sendDeviceInfo = (device_id, push_device_id, notificationPermission, contact_id) => {
  const data = {
    "device_id" : device_id,
    "push_device_id" : push_device_id,
    "notification_enabled" : notificationPermission,
    "contact_id" : contact_id
  };
  axios.post('http://onsite.amsoftonline.net:5009/MayRelease2021/CentralApi/api/devices/', data)
    .then(res=>{
      console.log("Device Info send successfully...");
    })
    .catch(err=>{
      console.log("Device Info send failed..."+err);
    });
};

let USER_ID = ""; 
const getOnDeviceInfo = async (contact_id) => {
  setTimeout(async() => {
    const {userId, hasNotificationPermission} = await OneSignal.getDeviceState();
    USER_ID = userId;
    
    console.log("Contact ID: " + contact_id);
    console.log("Android Device ID: " + getUniqueId());
    console.log("OneSignal Device ID : "+userId);
    
    sendDeviceInfo(getUniqueId(),userId,hasNotificationPermission, contact_id);
  }, 10000);
};

// export const sendPushNotification = (message) => {
//   console.log("Player ID : "+USER_ID);
//   console.log("Message   : "+message);
//   axios.put('http://onsite.amsoftonline.net:5009/MayRelease2021/CentralApi/api/devices?deviceId='+USER_ID+"&message="+message+"")
//     .then(res=>{
//       console.log("Push Notification send successfully...");
//       console.log(res);
//     })
//     .catch(err=>{
//       console.log("Push Notification send failed..."+err);
//     });
// };

export default pushNotifications = (contact_id) => {
  //OneSignal Init Code
  getAppId();
  //END OneSignal Init Code

  //Prompt for push on iOS
  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log("Prompt response:", response);
  });

  getOnDeviceInfo(contact_id);

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
      "OneSignal: notification will show in foreground:",
      notificationReceivedEvent
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData;
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    }
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log("OneSignal: notification opened:", notification);
  });
};
