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

function logout(){
  // Apply fade-out transition to the main content
  const mainContent = document.getElementById('dashboard'); // Adjust this to your actual content element
  mainContent.style.transition = 'opacity 1s';
  mainContent.style.opacity = 0;

  // Show the loading spinner
  const spinner = document.getElementById('loading-spinner'); // Adjust this to your loading spinner element
  spinner.style.display = 'block';

  // Perform the logout process
  firebase.auth().signOut().then(() => {
    // Delay the redirection for 2 seconds
    setTimeout(function() {
      window.location.href = "./login.html";
    }, 2000);
  }).catch((error) => {
    // Handle errors
  });
}