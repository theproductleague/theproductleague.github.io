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

// Reference messages collection
var db = firebase.database().ref('members');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var email = getInputVal('email');

  // Save message
  saveMessage(email);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(email){
  var dbEntry = db.push();
  dbEntry.set({
    email:email
  });
}