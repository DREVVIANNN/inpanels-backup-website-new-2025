if (window.location.pathname.includes("example.js")) {
  window.location.replace("/");
}


// Toggle menu logic
const toggleBtn = document.getElementById('demoToggle');
const menu = document.getElementById('demoMenu');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Optional: Hide menu when clicking outside
document.addEventListener('click', function (e) {
  if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

const fadeIn = (id) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.remove('opacity-0', 'translate-y-6');
    }
  };

  window.addEventListener('scroll', () => {
    ['aboutHeading', 'aboutText', 'aboutLeft', 'aboutRight'].forEach(fadeIn);
  });

  window.addEventListener('load', () => {
    ['aboutHeading', 'aboutText', 'aboutLeft', 'aboutRight'].forEach(fadeIn);
  });

  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target / 500;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCount();
  });

  function comingSoon() {
    alert("Upcoming features!");
  }

  const btn = document.getElementById('scrollTopBtn');
  let isVisible = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500 && !isVisible) {
      btn.classList.remove('opacity-0', 'invisible', 'translate-y-4', 'fade-out-down');
      btn.classList.add('opacity-100', 'visible', 'translate-y-0', 'bounce-in');
      isVisible = true;
    } else if (window.scrollY <= 500 && isVisible) {
      btn.classList.remove('bounce-in');
      btn.classList.add('fade-out-down');

      setTimeout(() => {
        btn.classList.remove('opacity-100', 'visible', 'translate-y-0', 'fade-out-down');
        btn.classList.add('opacity-0', 'invisible', 'translate-y-4');
      }, 500); // Match fade-out-down duration
      isVisible = false;
    }
  });

  btn.addEventListener('click', () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  });

  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }

  window.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".bar");
    bars.forEach(bar => {
      const target = bar.getAttribute("data-target");
      const height = (parseInt(target) / 100) * 256; // 256px = 100%
      setTimeout(() => {
        bar.style.height = height + "px";
      }, 200);
    });
  });

  function toggleModal(show) {
    const modal = document.getElementById('eventModal');
    if (show) {
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  }

