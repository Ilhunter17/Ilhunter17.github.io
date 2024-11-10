// Membuat atau membuka database IndexedDB
let db;
const request = indexedDB.open("ContactMessagesDB", 1);

// Konfigurasi dan membuat objek store saat database pertama kali dibuat
request.onupgradeneeded = function (event) {
  db = event.target.result;
  // Membuat objek store "messages" dengan keyPath "id"
  const objectStore = db.createObjectStore("messages", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("fullname", "fullname", { unique: false });
  objectStore.createIndex("email", "email", { unique: false });
  objectStore.createIndex("message", "message", { unique: false });
  objectStore.createIndex("timestamp", "timestamp", { unique: false });
};

// Menghubungkan ke database
request.onsuccess = function (event) {
  db = event.target.result;
};

request.onerror = function (event) {
  console.error("Database error:", event.target.errorCode);
};

function requestNotificationPermission() {
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      }
    });
  }
}

function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("Pesan Baru", {
      body: "Data berhasil disimpan di IndexedDB",
      icon: "/images/icon-pwa-192x192.png",
      vibrate: [200, 100, 200],
    });
  }
}

// Menyimpan data saat form disubmit
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (fullname && email && message) {
    const newMessage = {
      fullname: fullname,
      email: email,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Menyimpan data ke dalam IndexedDB
    const transaction = db.transaction(["messages"], "readwrite");
    const objectStore = transaction.objectStore("messages");
    const addRequest = objectStore.add(newMessage);

    addRequest.onsuccess = function () {
      console.log("Pesan berhasil disimpan ke IndexedDB");
      alert("Pesan Anda berhasil dikirim dan disimpan secara lokal.");
      
      // Tampilkan notifikasi
      showNotification();

      // Reset form setelah data disimpan
      document.getElementById("fullname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    };

    addRequest.onerror = function (event) {
      console.error("Error saat menyimpan pesan:", event.target.error);
    };
  } else {
    alert("Harap isi semua kolom.");
  }
});

document.addEventListener("DOMContentLoaded", requestNotificationPermission);
