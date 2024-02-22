/** Section 1 - Directional Arrow */

// Add event listener
document.addEventListener("readystatechange", function(event) {
  if (event.target.readyState === "interactive") {

    // Get HTML elements
    const ourServicesTrigger = document.getElementById("our-services-trigger");
    const ourServicesSubmenu = document.getElementById("our-services-submenu");
    const ourServicesArrow = document.getElementById("arrow-down-id");

    // Add click event listener to the ourServicesTrigger
    ourServicesTrigger.addEventListener("click", function() {

      // Check if the submenu is visible, if visible then hides it, if hidden then show it.
      if (ourServicesSubmenu.style.display === "block") {
        ourServicesSubmenu.style.display = "none";
      } else {
        ourServicesSubmenu.style.display = "block";
      }

      // Changes the arrows direction
      ourServicesArrow.classList.toggle("arrow-up");
    });
  }
});

/** Section 3 - Image Modal 
 * Assistance from Source: https://codepen.io/edubz/pen/wxbKwZ
*/

// Add event listener
document.addEventListener("readystatechange", function(event) {
  if (event.target.readyState === "interactive") {

  // Get HTML elements, sets image array.
  const images = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const imageNumber = document.getElementById("imageNumber");
  const close = document.querySelector(".close");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let currentImageNumber = 0;

  // Set click events for the prev, next, and close buttons in the modal
  prev.onclick = function() {
    showImage(currentImageNumber - 1);
  };
  
  next.onclick = function() {
    showImage(currentImageNumber + 1);
  };
  
  close.onclick = function() {
    modal.style.display = "none";
  };
  
  // Add click event listener to each image to open the modal and display the clicked image
  images.forEach(function(image, number) {
    image.addEventListener("click", function() {
      modal.style.display = "block";
      modalImage.src = image.src;
      currentImageNumber = number;
      updateCaption();
    });
  });  

  // Function to display the image at the given number in the modal
  function showImage(number) {

    // If image number is out of range, wrap it around to the other end of the images array
    if (number < 0) {
      number = images.length - 1;
    } else if (number >= images.length) {
      number = 0;
    }
    modalImage.src = images[number].src;
    currentImageNumber = number;
    updateCaption();
  }

   // Function to update the caption in the modal to show the current image number and total number of images
  function updateCaption() {
    imageNumber.innerHTML = (currentImageNumber + 1) + '/' + images.length;
  }
  
  // Add a click event listener to the window to close the modal when the area outside the modal is clicked
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
});