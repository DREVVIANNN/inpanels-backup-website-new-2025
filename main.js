import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-lite.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBY54WfX5xhYzlmOjDPDWhDn1vl3FH3u50",
  authDomain: "inpanels-game.firebaseapp.com",
  projectId: "inpanels-game",
  storageBucket: "inpanels-game.firebasestorage.app",
  messagingSenderId: "650159717173",
  appId: "1:650159717173:web:08c41c28aca9a2e69c6a7c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const mailboxIcon = document.getElementById("mailboxIcon");
const mailDot = document.getElementById("mailDot");
const mailboxContent = document.getElementById("mailboxContent");
const messageList = document.getElementById("messageList");

let hasUnread = false;

// Toggle mailbox
mailboxIcon.addEventListener("click", () => {
  mailboxContent.classList.toggle("hidden");
  if (hasUnread) markAllAsRead();
});

// Load messages
async function loadMessages(uid) {
  const messageSnap = await getDocs(collection(db, "messages"));
  const readSnap = await getDoc(doc(db, "userReads", uid));
  const readData = readSnap.exists() ? readSnap.data().read || {} : {};

  messageList.innerHTML = "";
  hasUnread = false;

  messageSnap.forEach((docSnap) => {
    const data = docSnap.data();
    const isRead = readData[docSnap.id];

    const msgHTML = `
    <div class="p-3 rounded bg-gray-800 border-l-4 border-yellow-500 space-y-2">
      <p class="font-semibold text-white">${data.title}</p>
      <p class="text-gray-300 text-sm">${data.content}</p>
  
      <!-- Developer Info -->
      <div class="flex items-center space-x-4 bg-gray-900 border border-gray-300 w-max rounded-lg px-2 py-1 mt-2">
        <!-- Avatar -->
        <div class="relative w-10 h-10 rounded-full p-1 bg-gradient-to-r from-red-700 to-red-900 animate-border-spin shadow-xl">
          <div class="w-full h-full bg-[#1e293b] rounded-full flex items-center justify-center overflow-hidden">
            <img src="${data.developer?.avatar || 'default.jpg'}" alt="Dev" class="rounded-full w-full h-full object-cover">
          </div>
        </div>
  
        <!-- Name + Tag -->
        <div>
          <div class="group relative select-none">
            <div class="flex items-center gap-2">
              <span class="bg-gradient-to-l from-red-700 to-red-900 text-white px-1.5 py-[1px] rounded text-[10px] font-bold">${data.developer?.tag || "DEV"}</span>
              <p class="font-medium text-blue-400">
                <i class="ri-verified-badge-fill"></i> <i class="ri-hammer-fill"></i> ${data.developer?.tag || "Developer"}
              </p>
            </div>
            <p class="text-gray-400 text-sm">${data.developer?.username || "@unknown"} <i class="ri-star-fill text-yellow-500"></i></p>
            <!-- Tooltip -->
            <div class="absolute ml-16 -translate-x-1/2 mt-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              ${data.developer?.tag || "Developer"} Member
              <span class="bg-gradient-to-l from-red-700 to-red-900 text-white px-1.5 py-[1px] rounded text-[10px] font-bold">${data.developer?.tag || "DEV"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  

    messageList.innerHTML += msgHTML;

    if (!isRead) hasUnread = true;
  });

  mailDot.style.display = hasUnread ? "block" : "none";
}

async function markAllAsRead() {
  const uid = auth.currentUser.uid;
  const messageSnap = await getDocs(collection(db, "messages"));
  const readDocRef = doc(db, "userReads", uid);
  const readData = {};

  messageSnap.forEach((docSnap) => {
    readData[docSnap.id] = true;
  });

  await setDoc(readDocRef, { read: readData }, { merge: true });
  mailDot.style.display = "none";
}

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadMessages(user.uid);
  }
});