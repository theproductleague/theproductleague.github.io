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
    document.getElementById('memberPodcasts').style.display = 'block';
    var user = firebase.auth().currentUser;
    if(user != null){
        // Fetch user data from Firestore
        firebase.firestore().collection('members').doc(user.uid).get()
        .then(doc => {
            if (doc.exists) {
                const userData = doc.data();
                document.getElementById('greeting').innerHTML = ` <span> Welcome Back,</span> ${userData.firstName}.`;
                document.getElementById('name').innerHTML = userData.firstName + " " + userData.lastName;
                document.getElementById('email').innerHTML = userData.email;
                document.getElementById('url').innerHTML = `<a href="${userData.linkedin}" style="text-decoration: none;" target="_blank">${userData.linkedin}</a>`;
                document.getElementById('joinedDate').innerHTML = `${userData.joined} <span style="font-weight: bold; color: green;">(Fall 2023)</span>`;
                
            } else {
                console.log('User data not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }
} else {
    document.getElementById('memberPodcasts').style.display = 'block';
    setTimeout(function() {
        window.location.href = "./login.html";
    }, 2000);
}
});



function logout(){
    firebase.auth().signOut().then(() => {
        setTimeout(function() {
        window.location.href = "../podcasts.html";
    }, 2000); // Delay in milliseconds (2000ms = 2 seconds)   
    }).catch((error) => {
        //...
    });
}