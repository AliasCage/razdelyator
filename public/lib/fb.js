const firebaseConfig = {
    apiKey: "AIzaSyDwyP6pcgmdXmChCCVRHS-BoLoKePcsPdo",
    authDomain: "razdelyator-2df4b.firebaseapp.com",
    databaseURL: "https://razdelyator-2df4b.firebaseio.com",
    projectId: "razdelyator-2df4b",
    storageBucket: "razdelyator-2df4b.appspot.com",
    messagingSenderId: "354974286422",
    appId: "1:354974286422:web:37e805dcf1296a9a74f1f7",
    measurementId: "G-E5MVVLT4BP"
};
var database;

export function load(name) {
    if (!database) {
        return;
    }
    var ref = database.ref("base");
    var postsRef = ref.child("raiting");
    var newPostRef = postsRef.push();
    newPostRef.set({
        score: 23,
        name: name,
        email: "cool_gamer@gmail.com"
    });
}

export function getRating() {
    if (!database) {
        return;
    }
    var list = [];
    var rootRef = database.ref("base");
    var urlRef = rootRef.child("raiting");
    urlRef.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            var childKey = child.key;
            var childData = child.val();
            console.log(childKey + ": " + childData);
            list.push(childData);
        });
    });
    return list;
}

export function saveResult(name, email, score) {
    if (!database) {
        return;
    }
    var ref = database.ref("base");
    var postsRef = ref.child("raiting");
    var newPostRef = postsRef.push();
    newPostRef.set({
        count: score,
        name: name,
        email: email
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //

    // firebase.initializeApp(firebaseConfig);
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/base').on('child_added', snapshot => {
    //     console.log("Added successfully written!")
    // });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = ['database'].filter(feature => typeof app[feature] === 'function');
        // document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;


        database = firebase.database();
        load("def");


    } catch (e) {
        console.error(e);
        document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});