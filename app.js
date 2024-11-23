const firebaseConfig = {
  apiKey: "AIzaSyCfYYeIcHXUpLMPy3CEUzYS9cvfcODG-MY",
  authDomain: "first-project-9a1f9.firebaseapp.com",
  projectId: "first-project-9a1f9",
  storageBucket: "first-project-9a1f9.firebasestorage.app",
  messagingSenderId: "509391376128",
  appId: "1:509391376128:web:f5ce55bb68a5d73e686de5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
console.log(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const auth = getAuth(app);

// Your web app's Firebase configuration
const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const signInBtn = document.getElementById("signin-btn");
const signOutBtn = document.getElementById("signout-btn");
const weatherPage = document.querySelector(".section-1");
const mainPage = document.querySelector("#main");

weatherPage.style.display = "none";

// onAuthStateChanged(auth,);

const signInButtonPressed = async (e) => {
  e.preventDefault();
  try {
    const userCrendential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(userCrendential);
    alert("Your have signed in successfully!");
    weatherPage.style.display = "block";
    mainPage.style.display = "none";
  } catch (error) {
    alert(" Try to make a strong password that contains digits and characters");
  }
};

const signUpButtonPressed = async (e) => {
  e.preventDefault();
  try {
    const userCrendential1 = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(userCrendential1);
    alert("Your account has been created successfully!");
    weatherPage.style.display = "block";
    mainPage.style.display = "none";
  } catch (error) {
    alert(error.code + error.message);
  }
};

const checkAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      alert("You are in the system");
    } else {
      alert("You are not in the system");
    }
  });
};

const signOutButtonPressed = async () => {
  await signOut(auth);
  history.go(0);
  weatherPage.style.display = "none";
  mainPage.style.display = "block";
};

checkAuthState();
signUpBtn.addEventListener("click", signUpButtonPressed);
signInBtn.addEventListener("click", signInButtonPressed);
signOutBtn.addEventListener("click", signOutButtonPressed);

const searchBox = document.querySelector("#city_input");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

const apiKey = "2322fe7517c386e7d522d0dcc939b561";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);

  if (data.name == undefined) {
    document.querySelector(".city").innerHTML = "city not found";
    document.querySelector(".temp").innerHTML = 0 + "°C";
    document.querySelector(".humidity").innerHTML = 0 + "%";
    document.querySelector(".wind").innerHTML = 0 + " km/h";
    var img = document.querySelector(".weather_icon") ;
    img.src = "images/np.png";
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.main.temp <=10)
    {
        var img = document.querySelector(".weather_icon") ;
        img.src = "images/snow.png";
    }
    else if(data.main.humidity>=80)
    {
        var img = document.querySelector(".weather_icon") ;
        img.src = "images/rain.png";
    }
    else if(data.main.temp >10 && data.main.temp <= 20)
    {
        var img = document.querySelector(".weather_icon") ;
        img.src = "images/mist.png";
    }
    else if(data.main.temp > 20 && data.wind.speed>4)
    {
        var img = document.querySelector(".weather_icon") ;
        img.src = "images/drizzle.png";
    }
    else
    {
        var img = document.querySelector(".weather_icon") ;
        img.src = "images/clear.png";

    }
    

  }
  
}
