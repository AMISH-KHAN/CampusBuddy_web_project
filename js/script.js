const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const login=document.querySelectorAll(".login")
const logout=document.querySelectorAll(".logout")
const sell=document.querySelectorAll(".sell")

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());


const container = document.querySelector('.container-login');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

if(registerBtn){

  registerBtn.addEventListener('click', () => {
      container.classList.add('active');
})
}

if(loginBtn){

  loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
  })
  
}

console.log("s")
//handels login and logout
function isLogin(){
  if(localStorage.getItem("login")=="true"){
    console.log("true")
    return true
  }
  return false
}
console.log(logout)
if(isLogin()){
    logout[0].style.visibility="visible"
    logout[1].style.visibility="visible"
    sell[0].style.visibility="visible"
    sell[1].style.visibility="visible"
    login[0].style.visibility="hidden"
    login[1].style.visibility="hidden"
    // let li=document.createElement("li")
    // let a=document.createElement("a")
    // a.href="./pages/sell.html"
    // a.innerHTML="Sell"
    // li.appendChild(a)
    // links.appendChild(li)
    
  }
  else{
    logout[0].style.visibility="hidden"
    logout[1].style.visibility="hidden"
    sell[0].style.visibility="hidden"
    sell[1].style.visibility="hidden"
    login[0].style.visibility="visible"
    login[1].style.visibility="visible"
    
}