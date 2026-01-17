
// Modal Image Gallery logic
// Modal Image Gallery logic
function openModal(element) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImg");
  var modalVideo = document.getElementById("modalVideo"); // Add reference to video element
  var captionText = document.getElementById("caption");

  modal.style.display = "block";

  if (element.tagName === 'VIDEO') {
    modalImg.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = element.src;
    captionText.innerHTML = "";
    modalVideo.play();
  } else {
    modalVideo.style.display = "none";
    modalVideo.pause();
    modalImg.style.display = "block";
    modalImg.src = element.src;
    captionText.innerHTML = element.alt;
  }
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  var modalVideo = document.getElementById("modalVideo");
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
  modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  var modal = document.getElementById("imageModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
