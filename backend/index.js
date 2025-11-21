
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} 
  from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { 
  getFirestore ,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCFzRTdu2LW3U7X9KtNeCry6ciAx8NOVEw",
  authDomain: "projectsem1-c522e.firebaseapp.com",
  projectId: "projectsem1-c522e",
  storageBucket: "projectsem1-c522e.firebasestorage.app",
  messagingSenderId: "715044242258",
  appId: "1:715044242258:web:4bc1611c2ec0646063f08b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app)
const q =collection(db,"sellItem")

let register = document.getElementById("register");
if(register){
register.addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("User registered successfully!");
      localStorage.setItem("login",true)
      localStorage.setItem("userEmail",email)
      window.location.href="../index.html"
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
});
}



let login=document.getElementById("loginBtn")

if(login){


login.addEventListener("click",()=>{
    let email=document.getElementById("login-email").value
    let password=document.getElementById("login-password").value

    signInWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert("login successful")
    localStorage.setItem("login",true)
    localStorage.setItem("user",user.email)
    window.location.href="../index.html"
    // ...
  })
  .catch((error) => {
    alert(error.message)
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})
}
let logout=document.querySelectorAll(".logout")

if(logout){

logout.forEach(btn => {
  
  btn.addEventListener("click",()=>{
    console.log("click")
    signOut(auth).then(() => {
    // Sign-out successful.
    alert("Logout successful")
  
    localStorage.clear()
    window.location.href="../index.html"
  }).catch((error) => {
    // An error happened.
    alert(error.message)
  });
  
  })
});

}





let sellSubmitBtn=document.getElementById("sell-submit-btn")
console.log("ehllo")
if(sellSubmitBtn){

  sellSubmitBtn.addEventListener("click",async(e)=>{
      e.preventDefault()
      const email=document.getElementById("sell-email")
      const name=document.getElementById("sell-fullname")
      const productName=document.getElementById("sell-productName")
      const price=document.getElementById("sell-price")
      const phone=document.getElementById("sell-number")
      const fileInput=document.getElementById("imgFile")

      const file=fileInput.files[0]
        if (!file) {
    alert("Select a file first!");
    return;
  }
    const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset","codeBuddy");
  formData.append("cloud_name","dxjlo4hyy")

  const res = await fetch("https://api.cloudinary.com/v1_1/dxjlo4hyy/image/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  console.log("Image URL:", data.secure_url);
  const url=data.secure_url
      if(phone.value.toString().length<10){
        alert("Invalid Phone number")
        return;
      }
      try{
        const docRef=await addDoc(q,{
          name:name.value,
          email:email.value,
          productName:productName.value,
          price:price.value,
          phone:phone.value,
          imgUrl:url

        });
        console.log("data added",docRef.id)
        alert("Data uploaded Successfully")
        window.location.href="./marketPlace.html"
      }
      catch(error){
          alert(error)
      }
    })
}

export const fetchMarketplaceItems = async () => {
    try {
        const q = collection(db, "sellItem");
        const querySnapshot = await getDocs(q);
        
        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return items;
    } catch (error) {
        console.error("Error fetching marketplace items:", error);
        throw error; 
    }
};