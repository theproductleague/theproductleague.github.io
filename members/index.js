// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyDcquIc53JuY0sX7FOj2k1eKGAoTFgYYvA",
  authDomain: "userstplutd.firebaseapp.com",
  databaseURL: "https://userstplutd-default-rtdb.firebaseio.com",
  projectId: "userstplutd",
  storageBucket: "userstplutd.appspot.com",
  messagingSenderId: "784438191274",
  appId: "1:784438191274:web:b8af3ee0e2df0255365cd3"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("login-container").style.display = "none";
    var user = firebase.auth().currentUser;
    if(user != null){
      var email_id = user.email;
      // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      document.querySelector('.greet').style.display = 'block';
    }
  } else {
    // No user is signed in.
    document.getElementById("login-container").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
  }
});

function login(){

  var email = document.getElementById("floatingEmailInput").value;
  var password = document.getElementById("floatingPasswordInput").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      document.getElementById("login-container").style.display = "block";
      document.getElementById("dashboard").style.display = "none";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " : " + errorMessage);
  });
}

function logout(){
  firebase.auth().signOut().then(() => {
    setTimeout(function() {
      window.location.href = "https://potential-space-acorn-4wgxxxvxgvrcjw5v-5501.app.github.dev/members/login.html";
  }, 2000); // Delay in milliseconds (2000ms = 2 seconds)   
  }).catch((error) => {
    //...
  });
}