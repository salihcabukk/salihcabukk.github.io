const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const brandPhoto = document.querySelector(".brand-photo");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (brandPhoto) {
  brandPhoto.setAttribute("role", "button");
  brandPhoto.setAttribute("tabindex", "0");
  brandPhoto.setAttribute("aria-label", "Logoyu büyüt");

  const lightbox = document.createElement("div");
  lightbox.className = "logo-lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="logo-lightbox-close" type="button" aria-label="Kapat">X</button>
    <img src="logo.png" alt="Salih Çabuk logo" />
  `;
  document.body.appendChild(lightbox);

  const closeButton = lightbox.querySelector(".logo-lightbox-close");

  const openLightbox = () => {
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    brandPhoto.focus();
  };

  brandPhoto.addEventListener("click", (event) => {
    event.preventDefault();
    openLightbox();
  });

  brandPhoto.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox();
    }
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
