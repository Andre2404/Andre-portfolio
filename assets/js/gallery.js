
// Modal Image Gallery logic for Resume section
// Simple popup - click overlay to close

function openModal(element) {
  const imageLightbox = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");

  if (!imageLightbox) return;

  // Add simple-mode class to hide zoom controls/nav
  imageLightbox.classList.add("simple-mode");

  if (element.tagName === 'VIDEO') {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.src = element.src;
    lightboxVideo.style.transform = "scale(1)";
    lightboxVideo.load();
  } else {
    lightboxVideo.style.display = "none";
    if (lightboxVideo) lightboxVideo.pause();
    lightboxImg.style.display = "block";
    lightboxImg.src = element.src;
    lightboxImg.style.transform = "scale(1)";
  }

  imageLightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const imageLightbox = document.getElementById("imageLightbox");
  const lightboxVideo = document.getElementById("lightboxVideo");

  if (imageLightbox) {
    imageLightbox.classList.remove("active");
    imageLightbox.classList.remove("simple-mode");
    document.body.style.overflow = "";
  }

  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }
}

// Make closeLightbox available globally for both modes
window.closeLightbox = function () {
  const imageLightbox = document.getElementById("imageLightbox");
  const lightboxVideo = document.getElementById("lightboxVideo");

  if (imageLightbox) {
    imageLightbox.classList.remove("active");
    imageLightbox.classList.remove("simple-mode");
    document.body.style.overflow = "";
  }

  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }
};

// Close on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
