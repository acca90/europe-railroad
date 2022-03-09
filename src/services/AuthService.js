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
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      this.auth0.authorize({
        connection: social,
        audience: 'https://europe-railroad/',
        redirectUri: window.location.origin + "/social/callback",
        responseType: 'token id_token',
      });
    } else {
      console.log('This is a IOS device');
      this.auth0.popup.authorize({
        connection: social,
        audience: 'https://europe-railroad/',
        redirectUri: window.location.origin + "/social/callback",
      }, callBack);
    }
  };

  login(form, errorLoginHandler) {
    this.auth0.login({
      realm: 'Username-Password-Authentication',
      email: form.email,
      password: form.password,
      redirectUri: "http://localhost:8080/social/callback",
    }, errorLoginHandler);
  };
}
