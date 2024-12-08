class button {
  constructor(className) {
    this.className = className;
    this.elements = document.getElementsByClassName(this.className);
    if (this.elements.length === 0) {
      throw new Error(
        `Element with ID "${this.className}" does not exist in the DOM.`
      );
    }
  }

  clickEvent(callback) {
    Array.from(this.elements).forEach((element) => {
      element.addEventListener("click", callback);
    });
  }
}

let btnLogin = new button("btn-login");
//Login button
btnLogin.clickEvent(() => {
  let btnReg = document.getElementById("rightDiv-register");
  if (btnReg.style.display === "flex" || !btnReg.style.display) {
    btnReg.style.display = "none";
  }
  let divLog = document.getElementById("rightDiv-login");
  if (divLog.style.display === "none" || !divLog.style.display) {
    divLog.style.display = "flex";
  }
});
//Register button
let btnRegister = new button("btn-register-1");
btnRegister.clickEvent(() => {
  let btnReg = document.getElementById("rightDiv-register");
  if (btnReg.style.display === "none" || !btnReg.style.display) {
    btnReg.style.display = "flex";
  }
  let divLog = document.getElementById("rightDiv-login");
  if (divLog.style.display === "flex" || !divLog.style.display) {
    divLog.style.display = "none";
  }
});
//Side bar Basics Button
//Side bar Basics Button
let btnBasics = new button("btn-basics");
btnBasics.clickEvent(() => {
  let btnBasic = document.getElementById("basic"); // Ensure the element exists

  // Check if no animation is applied
  if (!btnBasic.style.animation) {
    // Apply the animation
    btnBasic.style.animation = "slide-down 2s linear forwards";
  } else {
    // Reset animation for toggling
    btnBasic.style.animation = "none";
    btnBasic.offsetHeight; // Trigger reflow
    btnBasic.style.animation = "slide-down 2s linear forwards";
  }
});

class user {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUser() {
  localStorage.setItem("users", JSON.stringify(users));
}

document
  .querySelector(`#rightDiv-register input[placeholder='Password']`)
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const username = document.querySelector(
        "#rightDiv-register input[placeholder='Username']"
      ).value;
      const password = document.querySelector(
        "#rightDiv-register input[placeholder='Password']"
      ).value;

      if (username.trim() && password.trim()) {
        const newUser = new user(username, password);
        users.push(newUser);

        saveUser();

        console.log(`User Registered:`, newUser);
        alert("Registration successful!");

        (function () {
          let btnReg = document.getElementById("rightDiv-register");
          if (btnReg.style.display === "flex" || !btnReg.style.display) {
            btnReg.style.display = "none";
          }
          let divLog = document.getElementById("rightDiv-login");
          if (divLog.style.display === "none" || !divLog.style.display) {
            divLog.style.display = "flex";
          }
        })();

        //clear inputs
        document.querySelector(
          `#rightDiv-register input[placeholder=Username]`
        ).value = "";
        document.querySelector(
          `#rightDiv-register input[placeholder=Password]`
        ).value = "";
      } else {
        alert("Please fill out both fields");
      }
    }
  });

document
  .querySelector("#rightDiv-login input[placeholder='Password']")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const username = document.querySelector(
        "#rightDiv-login input[placeholder='Username']"
      ).value;
      const password = document.querySelector(
        "#rightDiv-login input[placeholder='Password']"
      ).value;

      // Check for matching user
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        console.log("User signed in:", user);
        alert("Sign-in successful!");
        window.location.href = "quiz.html";
      } else {
        alert("Invalid username or password.");
      }

      // Clear inputs
      document.querySelector(
        "#rightDiv-login input[placeholder='Username']"
      ).value = "";
      document.querySelector(
        "#rightDiv-login input[placeholder='Password']"
      ).value = "";
    }
  });
