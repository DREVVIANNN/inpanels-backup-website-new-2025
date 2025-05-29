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

    const searchInput = document.getElementById('search-input');
    const paragraphs = document.querySelectorAll('.content p');
    
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.trim().toLowerCase();
    
      // Remove all previous highlights
      paragraphs.forEach(p => {
        p.innerHTML = p.textContent;
      });
    
      if (query === '') {
        return; // If input is empty, do nothing more
      }
    
      let found = false;
    
      paragraphs.forEach(p => {
        const text = p.textContent.toLowerCase();
        if (!found && text.includes(query)) {
          // Highlight only the first match
          const regex = new RegExp(`(${query})`, 'gi');
          p.innerHTML = p.textContent.replace(regex, '<span class="highlight">$1</span>');
    
          // Scroll smoothly to the element
          p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
          found = true;
        }
      });
    });

  function copyToClipboard(elementId, button) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
      const original = button.innerHTML;
      button.innerHTML = '<i class="ri-check-line"></i>';
      button.disabled = true;
      setTimeout(() => {
        button.innerHTML = original;
        button.disabled = false;
      }, 1500);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  }

  function toggleChat() {
    const chat = document.getElementById('chatBox');
  
    if (chat.classList.contains('show')) {
      chat.classList.remove('show');
      chat.classList.add('hide');
  
      // Wait for animation to finish, then hide completely
      setTimeout(() => {
        chat.style.display = 'none';
        chat.classList.remove('hide');
      }, 300);
    } else {
      chat.style.display = 'flex'; // show first so animation can play
      setTimeout(() => {
        chat.classList.add('show');
      }, 10); // short delay to allow transition to trigger
    }
  }
  
  

  function selectOption(userChoice) {
    const chat = document.getElementById('chatMessages');
    const choices = document.getElementById('choiceButtons');

    // Hide buttons
    choices.style.display = "none";

    // User message
    const userMsg = document.createElement('div');
    userMsg.classList.add('chat-bubble', 'user-msg');
    userMsg.textContent = userChoice;
    chat.appendChild(userMsg);

    // Typing animation
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'ai-msg', 'typing');
    typingBubble.textContent = "loading...";
    typingBubble.id = "typingBubble";
    chat.appendChild(typingBubble);

    chat.scrollTop = chat.scrollHeight;

    // Simulate typing delay
    setTimeout(() => {
      typingBubble.remove();

      const aiMsg = document.createElement('div');
      aiMsg.classList.add('chat-bubble', 'ai-msg');
      aiMsg.textContent = getAIResponse(userChoice);
      chat.appendChild(aiMsg);

      // Show choices again
      choices.style.display = "flex";

      chat.scrollTop = chat.scrollHeight;
    }, 1200);
  }

  function getAIResponse(choice) {
    switch (choice) {
      case 'Siapa pemilik AERO-PS?':
        return '@Satya dan @Faisal adalah pendiri sekaligus founder dari AERO-PS, merekalah yang berjasa untuk membangun server dan memberikan update menarik pada server.';
      case 'Apa yang diberikan kepada newbie?':
        return 'Server ini memberikan role staff gratis kepada playernya, dan beberapa assets game yang bernilai cukup tinggi/banyak. dan owner server juga memberikan experience yang bagus sekaligus yang terbaik untuk playernya.';
      case 'About InPanels':
        return 'InPanels/InP adalah kelompok website developer yang di bangun oleh @DREVVIANN dan merekalah yang bertanggung jawab untuk membangun website AERO-PS dan memberikan update terbaru untuk kebutuhan website itu sendiri.';
      case 'I got a bug on the website':
        return 'Jika anda menemukan sebuah bug di dalam website ini anda bisa mengabari team kami lewat group whatsapp/melalui menu contact us, tapi sayangnya contact us sedang dalam pengerjaan oleh tim InPanels.✨';
      default:
        return 'There is an error try again later.';
    }
  }

  const dialogues = [
    "Hey there, Welcome to Department Of InPanels Website Development Community (IWDC).",
    "I'm Zani, drevviann heart defender >//<, nice to meet you.",
    "Lets start your journey by exploring our website beside me.",
    "Good luck at your journey!"
  ];
  
  let dialogueIndex = 0;
  let charIndex = 0;
  let speed = 40;
  const textEl = document.getElementById("typed-text");
  const nextBtn = document.getElementById("next-btn");
  
  function typeWriter() {
    const currentText = dialogues[dialogueIndex];
  
    if (charIndex === 0) {
      nextBtn.style.display = "none"; // Hide button at start
    }
  
    if (charIndex < currentText.length) {
      textEl.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, speed);
    } else {
      nextBtn.style.display = "inline-block"; // Show button when done
    }
  }
  
  const wrapper = document.getElementById("wrapper");
  const overlay = document.getElementById("dialogue-overlay");
  
  // In your showNextDialogue() function:
  function showNextDialogue() {
    if (charIndex < dialogues[dialogueIndex].length) return;
  
    dialogueIndex++;
    if (dialogueIndex >= dialogues.length) {
      wrapper.style.display = "none";
      overlay.style.display = "none"; // 🔁 Hide white background
      return;
    }
  
    textEl.textContent = "";
    charIndex = 0;
    typeWriter();
  }
  
  
  nextBtn.addEventListener("click", showNextDialogue);
  
  // Start first dialogue
  typeWriter();

  const skipBtn = document.getElementById("skip-btn");

  skipBtn.addEventListener("click", () => {
    // Immediately hide dialogue and mark as seen
    wrapper.style.display = "none";
    overlay.style.display = "none";
    localStorage.setItem(DIALOGUE_KEY, "true");

    // Stop typing if it's running
    clearInterval(typingInterval);
  });

  const firebaseConfig = {
    apiKey: "AIzaSyBY54WfX5xhYzlmOjDPDWhDn1vl3FH3u50",
    authDomain: "inpanels-game.firebaseapp.com",
    projectId: "inpanels-game",
    storageBucket: "inpanels-game.firebasestorage.app",
    messagingSenderId: "650159717173",
    appId: "1:650159717173:web:08c41c28aca9a2e69c6a7c"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

 function onDevelopment() {
  alert("on development...");
 }
