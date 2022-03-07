import auth0 from 'auth0-js'

export default class AuthService {
  auth0 = new auth0.WebAuth({
    domain: 'europe-railroad.eu.auth0.com',
    clientID: 'YpnJbZuMC3qw14WHASj5L0yvHBAX33wJ',
    audience: 'https://europe-railroad/',
    responseType: 'token id_token'
  });

  getAuth0() {
    return this.auth0;
  };

  social(social, callBack) {
    this.auth0.popup.authorize({
      connection: social,
      audience: 'https://europe-railroad/',
      redirectUri: window.location.origin + "/social/callback",
    }, callBack);
  };

  handleAuthentication () {
    const parseHash = (resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
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
