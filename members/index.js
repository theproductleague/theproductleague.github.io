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
    
    var user = firebase.auth().currentUser;
    if(user != null){
      firebase.firestore().collection('members').doc(user.uid).get()
      .then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById('name').innerHTML = `${userData.firstName + " " + userData.lastName} <br/> <span style="font-size: small; color: #007bff">${userData.email}</span>`;
        } else {
            console.log('User data not found.');
      }
    });
    } 
    else {
      // No user is signed in.
      document.getElementById("dashboard").style.display = "none";
    }
  }
});

function login(){

  var email = document.getElementById("floatingEmailInput").value;
  var password = document.getElementById("floatingPasswordInput").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
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
  }, 2000); 
  }).catch((error) => {
    
  });
}