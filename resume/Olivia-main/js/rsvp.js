// Initialize EmailJS with your user ID
emailjs.init("hvD2IoYefk2FlBl2P");

// Get the form, message status, and message sent elements
const contactForm = document.getElementById("rsvp-form");
const messageSent = document.getElementById("message-sent");
const submitButton = document.getElementById("submit-btn");
const rsvpBanner = document.querySelector(".rsvp-banner");


// Get input elements
const nameInput = document.getElementById("name-input");
const attendingInputYes = document.getElementById("yes");
const attendingInputNo = document.getElementById("no");
const dietaryInput = document.getElementById("dietary-input");
const songInput = document.getElementById("song-input");
const messageInput = document.getElementById("message-input");

// Add a submit event listener to the form
contactForm.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  let formIsValid = true;

  // Check if name is valid
  if (!nameInput.checkValidity()) {
      nameInput.classList.add('input-error');
      formIsValid = false;
  }
  
  // Check if attending option is selected
  if (!attendingInputYes.checked && !attendingInputNo.checked) {
      const radioItems = document.querySelectorAll('.radio-item');
      radioItems.forEach(radio => radio.classList.add('input-error-option'));
      formIsValid = false;
  } else {
      const radioItems = document.querySelectorAll('.radio-item');
      radioItems.forEach(radio => radio.classList.remove('input-error-option'));
  }
  
  if (!formIsValid) {
      return;
  }

  // Change the submit button text to "SENDING..."
  submitButton.innerHTML = "Submitting...";

  // Get the form data
  const attending = attendingInputYes.checked ? "yes" : (attendingInputNo.checked ? "no" : "");
  
  const data = {
    name: nameInput.value,
    attending: attending,
    dietary_requirements: dietaryInput.value,
    song_requests: songInput.value,
    message: messageInput.value,
  };

  // Send the email using EmailJS
  emailjs.send("service_5zcmz28", "template_e5mjh0e", data)
  .then((response) => {
    console.log("Email sent:", response);
    // Hide the form and display the "Thank you" message
    contactForm.style.display = "none";
    messageSent.style.display = "flex"; // Changed from 'block' to 'flex'
    rsvpBanner.style.display = "none";  // Add this line
})

    .catch((error) => {
      console.error("Error sending email:", error);
      messageStatus.style.display = "block";
      messageStatus.innerHTML = "Failed to send RSVP. Please try again.";
    })
    .finally(() => {
      // Reset the submit button text to "SUBMIT"
      submitButton.innerHTML = "Submit";
    });
});

messageSent.addEventListener("click", function() {
    messageSent.style.display = "none";
    contactForm.style.display = "block";
    rsvpBanner.style.display = "block";  // Add this line

    // Also, clear the form fields
    nameInput.value = '';
    attendingInputYes.checked = false;
    attendingInputNo.checked = false;
    dietaryInput.value = '';
    songInput.value = '';
    messageInput.value = '';
});


contactForm.setAttribute("novalidate", true);

nameInput.addEventListener('animationend', () => {
  nameInput.classList.remove('input-error');
});

document.querySelectorAll('.radio-item').forEach(item => {
  item.addEventListener('animationend', () => {
      item.classList.remove('input-error-option');
  });
});
