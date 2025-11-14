// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFzRTdu2LW3U7X9KtNeCry6ciAx8NOVEw",
  authDomain: "projectsem1-c522e.firebaseapp.com",
  projectId: "projectsem1-c522e",
  storageBucket: "projectsem1-c522e.firebasestorage.app",
  messagingSenderId: "715044242258",
  appId: "1:715044242258:web:4bc1611c2ec0646063f08b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register button event
let register = document.getElementById("register");

register.addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Example: Register new user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("User registered successfully!");
      localStorage.setItem("login",true)
      localStorage.setItem("userEmail",email)
      console.log("User:", user);
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });

  // Example: Sign in existing user
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     alert("Signed in!");
  //     console.log(userCredential.user);
  //   })
  //   .catch((error) => {
  //     alert(error.message);
  //   });
});


let login=document.getElementById("login")

login.addEventListener("click",()=>{
    let email=document.getElementById("login-email").value
    let password=document.getElementById("login-password").value

    signInWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("login successful")
    localStorage.setItem("login",true)
    window.location.href="../index.html"
    // ...
  })
  .catch((error) => {
    alert(error.message)
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})