export default class GASection {
    static setInfo(responce) {
        //console.log(responce);
        document.querySelector('.avatar').setAttribute('src', responce.w3.Paa);
        document.querySelector('.nickname').innerHTML = responce.w3.ig;
        document.querySelector('.email').innerHTML = responce.w3.U3;

    }

    requestOAuth() {
        let GoogleAuth;
        let SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
        function handleClientLoad() {
            // Load the API's client and auth2 modules.
            // Call the initClient function after the modules load.
            gapi.load('client:auth2', initClient);
        }
        
        function initClient() {
            // Retrieve the discovery document for version 3 of YouTube Data API.
            // In practice, your app can retrieve one or more discovery documents.
            let discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

            // Initialize the gapi.client object, which app uses to make API requests.
            // Get API key and client ID from API Console.
            // 'scope' field specifies space-delimited list of access scopes.
            gapi.client.init({
                'apiKey': 'AIzaSyA17KYHw-TfsiBy3TdT8hThejNcLjdNnOo',
                'discoveryDocs': [discoveryUrl],
                'clientId': '556623487116-evicb9k95c2fdspip898br18n6ugh8qn.apps.googleusercontent.com',
                'scope': SCOPE
            }).then(function () {
                GoogleAuth = gapi.auth2.getAuthInstance();

                // Listen for sign-in state changes.
                GoogleAuth.isSignedIn.listen(updateSigninStatus);

                // Handle initial sign-in state. (Determine if user is already signed in.)
                let user = GoogleAuth.currentUser.get();
                setSigninStatus();

                // Call handleAuthClick function when user clicks on
                //      "Sign In/Authorize" button.
            
                document.querySelector('#sign-in-or-out-button').addEventListener('click', e => {
                handleAuthClick();
                });
                document.querySelector('#revoke-access-button').addEventListener('click', e => {
                revokeAccess();
                });
                // $('#sign-in-or-out-button').click(function() {
                // }); 
                // $('#revoke-access-button').click(function() {
                // }); 
            });
        }

        function handleAuthClick() {
            if (GoogleAuth.isSignedIn.get()) {
                // User is authorized and has clicked 'Sign out' button.
                GoogleAuth.signOut();
            } else {
                // User is not signed in. Start Google auth flow.
                GoogleAuth.signIn();
            }
        }

        function revokeAccess() {
            GoogleAuth.disconnect();
        }

        function setSigninStatus(isSignedIn) {
            let user = GoogleAuth.currentUser.get();
            let isAuthorized = user.hasGrantedScopes(SCOPE);
            if (isAuthorized) {
                GASection.setInfo(user);// fill info user panel...

                document.querySelector('.auth-section div').style.display = 'block';
                document.querySelector('#sign-in-or-out-button').innerHTML = 'Sign out';
                document.querySelector('#revoke-access-button').style.display = 'inline-block';
                showInfo('You are currently signed in and have granted access to this app.');
            } else {
                document.querySelector('.auth-section div').style.display = 'none';
                document.querySelector('#sign-in-or-out-button').innerHTML = 'Sign In';
                document.querySelector('#revoke-access-button').style.display = 'none';
                showInfo('You have not authorized this app or you are signed out.');
            }
        }

        function updateSigninStatus(isSignedIn) {
            setSigninStatus();
        }

        handleClientLoad();// add listener to sign in button
    }
}
