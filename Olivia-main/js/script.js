function updateLinks(passcode) {
  var links = document.querySelectorAll(".nav-links a");
  if (passcode === "passcode1") {
    links[1].setAttribute("href", "eventDetails.html");
    links[2].setAttribute("href", "location.html");
  } else if (passcode === "passcode2") {
    links[1].setAttribute("href", "alternate_eventDetails.html");
    links[2].setAttribute("href", "alternate_location.html");
  }
}

window.onload = function() {
  var pinValidated = localStorage.getItem("pinValidated");
  var pinTime = localStorage.getItem("pinTime");

  if (pinValidated === "true") {
    var currentTime = new Date().getTime();
    if (currentTime - pinTime <= 600000 * 10) {
      document.getElementById("pin-access").style.display = "none";
      var mainContent = document.getElementById("main-content");
      mainContent.style.display = "block";
      setTimeout(function() {
        mainContent.classList.add("visible");
      }, 50);

      var passcodeEntered = localStorage.getItem("passcodeEntered");
      updateLinks(passcodeEntered);
    } else {
      localStorage.removeItem("pinValidated");
      localStorage.removeItem("pinTime");
      localStorage.removeItem("passcodeEntered");
    }
  }

  var form = document.getElementById("pin-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    checkPin();
  });
}

function checkPin() {
  var pinInput = document.getElementById("pin-input");
  var pin = pinInput.value;
  var passcode1 = "1109";
  var passcode2 = "1234";

  if (pin === passcode1 || pin === passcode2) {
    var currentTime = new Date().getTime();
    localStorage.setItem("pinValidated", "true");
    localStorage.setItem("pinTime", currentTime.toString());
    localStorage.setItem("passcodeEntered", pin === passcode1 ? "passcode1" : "passcode2");

    document.getElementById("pin-access").style.display = "none";
    var mainContent = document.getElementById("main-content");
    mainContent.style.display = "block";
    setTimeout(function() {
      mainContent.classList.add("visible");
    }, 50);

    updateLinks(pin === passcode1 ? "passcode1" : "passcode2");
  } else {
    pinInput.classList.add("error");
    setTimeout(function() {
      pinInput.classList.remove("error");
    }, 1000);
  }
  pinInput.blur();
}
