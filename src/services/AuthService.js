import auth0 from 'auth0-js'

export default class AuthService {
  auth0facebook = new auth0.WebAuth({
    domain: 'europe-railroad.eu.auth0.com',
    clientID: 'YpnJbZuMC3qw14WHASj5L0yvHBAX33wJ',
    audience: 'https://europe-railroad/',
    responseType: 'token id_token'
  });

  getAuth0Facebook() {
    return this.auth0facebook;
  };

  facebook(callBack) {
    this.auth0facebook.popup.authorize({
      connection: 'facebook',
      audience: 'https://europe-railroad/',
      redirectUri: window.location.origin + "/facebook/callback",
    }, callBack);
  };

  handleAuthentication () {
    const parseHash = (resolve, reject) => {
      this.auth0facebook.parseHash((err, authResult) => {
        if (authResult) {
          resolve(authResult);
        } else if (err) {
          reject(err);
        }
      })
    };

    return new Promise(function(resolve, reject) {
      parseHash(resolve, reject);
    });
  }
}
