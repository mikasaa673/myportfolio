const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

// Skills: open on hover (mouseenter) and close on leave
const skillsContents = Array.from(document.querySelectorAll(".skills__content"));

skillsContents.forEach((content) => {
  // open on hover
  content.addEventListener("mouseenter", () => {
    skillsContents.forEach((c) => c.classList.remove("skills__open"));
    content.classList.add("skills__open");
  });

  // close when mouse leaves the content area
  content.addEventListener("mouseleave", () => {
    content.classList.remove("skills__open");
  });
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== TYPING EFFECT ====================*/
const typingText = document.getElementById('typing-text');
const text = "Comp-Sci Grad specialising in AI and Data Science";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typingText.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  } else {
    // Add cursor blinking effect after typing is complete
    setTimeout(() => {
      typingText.classList.add('typing-complete');
    }, 500);
  }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
  setTimeout(typeWriter, 500);
});

/*==================== COMING-SOON INTERCEPT ====================*/
// Non-destructive: intercept clicks on 'See Live' / .button--live anchors
document.addEventListener('click', function (e) {
  const a = e.target.closest && e.target.closest('a');
  if (!a) return;

  // Only consider anchors that look like project live buttons
  const isLiveButton = a.classList.contains('button--live') || /see\s*live/i.test(a.textContent);
  if (!isLiveButton) return;

  const href = (a.getAttribute('href') || '').trim();
  if (!href) return;

  // Auto-detect likely non-deployed targets (GitHub repo links)
  const shouldIntercept = href.includes('github.com');

  if (shouldIntercept) {
    e.preventDefault();
    // Pass original href for context so coming-soon can show a friendly message
    const dest = 'coming-soon.html?src=' + encodeURIComponent(href);
    // navigate in same tab to the friendly placeholder
    window.location.href = dest;
  }
});

/*==================== CONTACT FORM HANDLING ====================*/
document.getElementById('contact-submit')?.addEventListener('click', function(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  const subject = encodeURIComponent('Message from Portfolio from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
  
  window.location.href = 'mailto:karthik123.spati@gmail.com?subject=' + subject + '&body=' + body;
});
