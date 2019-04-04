var CLIENT_ID = "689316741981-0ul3uh99vhdombecj5dedtlg7qj70och.apps.googleusercontent.com";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

var authorizeButton = document.getElementById("enter-button");
var signoutButton = document.getElementById("exit-button");
var content = document.getElementById("content");

//default youtube channel
var defaultChannel = "GrantCardone"; 

//Load auth2 library
function handleClientLoad() {
    gapi.load("client:auth2", initClient);

};

//initiate API client library and set up sign-in listeners
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES

    }).then( () => {
        //Listen for sign-in changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        //Handle initial sign in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignouClick;
    });
};

//update html sign-in state changes - display buttons
function updateSigninStatus(isSignedIn) {
    if(isSignedIn) {
        authorizeButton.style.display = "none";
        signoutButton.style.display = "block";
        content.style.display = "block";
        getChannel(defaultChannel);

    }else {
        authorizeButton.style.display = "block";
        signoutButton.style.display = "none";
        content.style.display = "none";
    };
}

//Handle login
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

//Handle logout
function handleSignouClick() {
    gapi.auth2.getAuthInstance().signOut();
}

//Get channel from API
function getChannel(channel) {
    gapi.client.youtube.channels
    .list({
        part: "snippet, contentDetails, statistics",
        forUsername: channel
    })
    .then(response => {
        console.log(response);

    })
    .catch(err => alert ("No Channel By That Name"));
}