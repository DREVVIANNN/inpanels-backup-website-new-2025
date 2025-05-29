document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('contextmenu', e => e.preventDefault());
    });
  });

  window.onload = function() {
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const content = document.getElementById('content');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      sideMenu.classList.toggle('active');
    });
  
    
      hamburger.classList.remove('active');
      sideMenu.classList.remove('active');
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBY54WfX5xhYzlmOjDPDWhDn1vl3FH3u50",
      authDomain: "inpanels-game.firebaseapp.com",
      projectId: "inpanels-game",
      storageBucket: "inpanels-game.firebasestorage.app",
      messagingSenderId: "650159717173",
      appId: "1:650159717173:web:08c41c28aca9a2e69c6a7c"
    };
  
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();


  document.querySelectorAll(".btn-container").forEach((wrap) => {
    const postId = wrap.getAttribute("data-post-id");
    const btn = wrap.querySelector(".like-btn");
    const countSpan = wrap.querySelector(".like-count");
    const docRef = db.collection("likes").doc(postId);

    let hasLiked = localStorage.getItem(`hasLiked_${postId}`) === "true";

    function updateButtonUI() {
      btn.innerHTML = hasLiked
        ? '<i class="ri-heart-fill"></i>'
        : '<i class="ri-heart-line"></i>';
    }

    function loadLikeCount() {
      docRef.get().then((doc) => {
        if (doc.exists) {
          const count = doc.data().count || 0;
          countSpan.textContent = count;
        } else {
          docRef.set({ count: 0 });
          countSpan.textContent = 0;
        }
        updateButtonUI();
      }).catch((err) => {
        console.error(`❌ Error loading ${postId}:`, err);
      });
    }

    btn.addEventListener("click", () => {
      docRef.get().then((doc) => {
        if (!doc.exists) return;

        let count = doc.data().count || 0;

        if (hasLiked) {
          count = Math.max(0, count - 1);
          localStorage.setItem(`hasLiked_${postId}`, "false");
        } else {
          count += 1;
          localStorage.setItem(`hasLiked_${postId}`, "true");
        }

        hasLiked = !hasLiked;

        docRef.update({ count }).then(() => {
          countSpan.textContent = count;
          updateButtonUI();
        });
      });
    });

    loadLikeCount();
  });

  function onDevelopment() {
    alert("disabled for a while...")
  }
  function comingSoon() {
    alert("Upcoming Collaboration May 2025.")
  }

const sheet = document.getElementById('bottomSheet');

function openSheet() {
  sheet.classList.add('active');
}

function closeSheet() {
  sheet.classList.remove('active');
}
    
const preloader = document.getElementById('preloader');
  const siteContent = document.getElementById('site-content');
  const body = document.body;

  function hidePreloader() {
    preloader.classList.add('opacity-0');
    setTimeout(() => {
      preloader.style.display = 'none';
      siteContent.classList.remove('opacity-0');
      body.classList.remove('overflow-hidden'); // Restore scrolling
    }, 500); // match transition
  }

  // Auto dismiss
  window.addEventListener('load', () => {
    setTimeout(() => {
      hidePreloader();
    }, 14500);
  });

  // Click to dismiss
  preloader.addEventListener('click', hidePreloader);

  // Get the audio element
const audioElement = document.getElementById("background-music");
     
// Function to check if audio is playing
function isPlaying(audio) {
    return !audio.paused && !audio.ended && audio.readyState > 2;
}

// Event listener to ensure autoplay works after user interaction (for stricter browsers)
document.addEventListener("click", () => {
    if (!isPlaying(audioElement)) {
        audioElement.play().catch(error => {
            console.error("Autoplay failed. User interaction is required:", error);
        });
    }
});

// Add fallback logic for loading audio sources
audioElement.addEventListener("error", () => {
    console.error("Audio failed to load. Check file paths or URLs.");
    alert("Audio failed to load. Please check your connection or file availability.");
});

// Log when audio starts playing
audioElement.addEventListener("play", () => {
    console.log("Audio is playing.");
});

// Log when audio is paused
audioElement.addEventListener("pause", () => {
    console.log("Audio is paused.");
});

// Attempt to play audio on page load
window.addEventListener("load", () => {
    audioElement.play().catch(error => {
        console.warn("Autoplay might be blocked by the browser:", error);
    });
});

const form = document.querySelector("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      result.classList.remove("hidden");
      form.reset();
    } else {
      result.innerHTML = "Something went wrong!";
      result.classList.remove("hidden");
    }
  });