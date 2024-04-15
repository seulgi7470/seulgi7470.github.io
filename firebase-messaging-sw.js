importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',);

const app = firebase.initializeApp({
    apiKey: "AIzaSyBCXh3XU-18wirupAglOzl-uk2GN_xr17k",
    authDomain: "base-project-1ff12.firebaseapp.com",
    projectId: "base-project-1ff12",
    storageBucket: "base-project-1ff12.appspot.com",
    messagingSenderId: "810624942153",
    appId: "1:810624942153:web:b81993400cdd69f75fff98",
    measurementId: "G-7ZKCJ7G3LH"
});

const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
    };

    ServiceWorkerRegistration.showNotification(title, options);
});

self.addEventListener("install", function (e) {
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
});

/// 알림이 왔을 때
self.addEventListener("push", function (e) {
    if (!e.data.json()) return;

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    
    const notificationOptions = {
        body: resultData.body,
    };

    console.log(resultData.title, {
        body: resultData.body,
    });

    e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});

/// 알림팝업 클릭했을 때
self.addEventListener("notificationclick", function (event) {
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});