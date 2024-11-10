// Import Firebase scripts untuk menggunakan FCMs
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

// Konfigurasi Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCdYPyxc2YoqyREaXjwvwzRFdoJHH14N2M",
  authDomain: "ilhan-pwa.firebaseapp.com",
  projectId: "ilhan-pwa",
  storageBucket: "ilhan-pwa.firebasestorage.app",
  messagingSenderId: "521193748580",
  appId: "1:521193748580:web:f15ec510fe418e09f44771",
});



// Inisialisasi Firebase Messaging
const messaging = firebase.messaging();

// Menangani pesan latar belakang
messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/images/icon-pwa-192x192.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
});
