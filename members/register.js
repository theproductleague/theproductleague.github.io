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
        document.getElementById('checkEmailBtn').style.display = 'none';
    } else {
        document.getElementById('emailNotExistAlert').style.display = 'block';
    }
});

passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('I am working')
    const passwordValue = document.getElementById('password').value;
    const checkPasswordValue = document.getElementById('checkPassword').value;
    
    // Password regex pattern: Requires at least 8 characters, at least one uppercase letter, at least one lowercase letter, and at least one digit.
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordPattern.test(passwordValue)) {
        document.getElementById('passwordCheckValidationAlert').style.display = 'block';
    }

    if (passwordValue != checkPasswordValue) {
        document.getElementById('passwordsNotMatchAlert').style.display = 'block';
    }

    if (!emailToUpdate) {
        console.log('Please check the email first.');
    }

    console.log(emailToUpdate)
    // Update the password in the Firebase Realtime Database
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(emailToUpdate, passwordValue);
        const user = userCredential.user;
        const firstName =  document.getElementById('firstName').value;
        const lastName =  document.getElementById('lastName').value;
        const linkedin =  document.getElementById('linkedin').value;

        const timestamp = Date.now();
        const currentDate = new Date(timestamp);

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        const day = currentDate.getDate();

        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

        console.log(formattedDate);

        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            linkedin: linkedin,
            email: emailToUpdate,
            joined: formattedDate
        }
        
        const db = firebase.firestore();
        db.collection('members').doc(user.uid).set(userInfo);
    }   
    catch(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + " : " + errorMessage);
            document.getElementById('userAlreadyExistsAlert').style.display = "block";
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
            console.log('Password updated successfully.')
        } else {
            throw new Error('User key not found in the database.');
        }
    } else {
        throw new Error('User not found in the database.');
    }
}

async function redirect() {
    setTimeout(function() {
        window.location.href = "./index.html";
    }, 2000);
}