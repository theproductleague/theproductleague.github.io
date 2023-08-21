// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcquIc53JuY0sX7FOj2k1eKGAoTFgYYvA",
    authDomain: "userstplutd.firebaseapp.com",
    databaseURL: "https://userstplutd-default-rtdb.firebaseio.com",
    projectId: "userstplutd",
    storageBucket: "userstplutd.appspot.com",
    messagingSenderId: "784438191274",
    appId: "1:784438191274:web:b8af3ee0e2df0255365cd3"
};
firebase.initializeApp(firebaseConfig);


const emailForm = document.getElementById('emailForm');
const checkEmailBtn = document.getElementById('checkEmailBtn');
const passwordSection = document.getElementById('passwordSection');
const passwordForm = document.getElementById('passwordForm');

let emailToUpdate = null; // Store the email to update

checkEmailBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;

    // Check if the email exists in the Firebase Realtime Database
    const emailExists = await checkEmailExistsInDatabase(email);

    if (emailExists) {
        emailToUpdate = email;
        passwordSection.style.display = 'block';
        
    } else {
        alert('Email does not exist in the database.');
    }
});

passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const passwordField = document.getElementById('password')
    const passwordValue = document.getElementById('password').value;

    if (!emailToUpdate) {
        alert('Please check the email first.');
        return;
    }

    console.log(emailToUpdate)
    // Update the password in the Firebase Realtime Database
    try {
        firebase.auth().createUserWithEmailAndPassword(emailToUpdate, passwordValue)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
        alert('User created successfully.');
    } catch (error) {
        console.error('Error updating password:', error.message);
    }
});

// Function to check email existence in Firebase Realtime Database
async function checkEmailExistsInDatabase(email) {
    const database = firebase.database();
    const usersRef = database.ref('members'); // Change to your database reference
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
    return snapshot.exists();
}

async function updatePasswordInDatabase(email, password) {
    const database = firebase.database();
    const usersRef = database.ref('members'); // Change to your database reference
    
    // Find the record with the email and update the password
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('child_added');
    if (snapshot.exists()) {
        const userKey = snapshot.key;
        if (userKey) {
            await usersRef.child(userKey).update({ password: password });
            console.log('Password updated successfully.');
            window.location.href = "https://potential-space-acorn-4wgxxxvxgvrcjw5v-5501.app.github.dev/members/index.html";
        } else {
            throw new Error('User key not found in the database.');
        }
    } else {
        throw new Error('User not found in the database.');
    }
}

