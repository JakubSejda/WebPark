/* Burger menu toggle */
function toggleMenu() {
    const nav = document.querySelector('header .menu ul');
    nav.classList.toggle('show');
}

/* Smooth scroll pro anchor odkazy */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
        // Skryjeme menu po kliknutí (mobilní zobrazení)
        const nav = document.querySelector('header .menu ul');
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    });
});

/* Animace – Intersection Observer + okamžitá aktivace pro prvky v viewportu */
document.addEventListener("DOMContentLoaded", () => {
    const animateEls = document.querySelectorAll(".animate");
    const obsOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, obsOptions);
  
    animateEls.forEach(el => {
      observer.observe(el);
  
      // Pokud je prvek už při načtení vidět, aktivuj ho hned
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("visible");
        observer.unobserve(el);
      }
    });
  });
  

/* Recenze slider */
let currentReview = 0;
const reviews = document.querySelectorAll('.recenze-item');
const nextBtn = document.querySelector('.next-review');
const prevBtn = document.querySelector('.prev-review');

function showReview(index) {
    reviews.forEach((review, i) => {
        review.style.display = (i === index) ? 'block' : 'none';
    });
}

/* Inicializace slideru */
if (reviews.length > 0) {
    showReview(currentReview);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    });

    prevBtn.addEventListener('click', () => {
        currentReview = (currentReview - 1 + reviews.length) % reviews.length;
        showReview(currentReview);
    });
}

/* Automatické přepínání recenzí každých 5 sekund */
setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}, 5000);
  

/* Nastavení aktuálního roku ve footeru */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

/*Dovednosti*/
document.addEventListener("DOMContentLoaded", function() {
    const list = document.querySelector('.dovednosti-list');
    if (list) {
        list.innerHTML += list.innerHTML;
    }
});

/* Počítání statistik*/
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 4000; // celková doba animace v ms
  
    counters.forEach(counter => {
      // zjistíme cílovou hodnotu a sufix (např. '%')
      const suffixEl = counter.querySelector('.stat-suffix');
      const suffix = suffixEl ? suffixEl.textContent : '';
      const target = parseInt(counter.textContent, 10);
  
      // vyčistíme obsah, aby zůstal jen číselný uzel
      counter.textContent = '0';
      if (suffixEl) counter.appendChild(suffixEl);
  
      // spočítáme interval mezi kroky
      const stepTime = Math.max(Math.floor(duration / target), 20);
  
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        counter.firstChild.textContent = current;
        if (current >= target) {
          clearInterval(timer);
          counter.firstChild.textContent = target;
        }
      }, stepTime);
    });
});
  