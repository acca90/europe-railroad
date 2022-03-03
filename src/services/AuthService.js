import auth0 from 'auth0-js'

export default class AuthService {
    auth0facebook = new auth0.WebAuth({
        domain: 'europe-railroad.eu.auth0.com',
        clientID: 'YpnJbZuMC3qw14WHASj5L0yvHBAX33wJ',
        audience: 'https://europe-railroad/',
        responseType: 'token id_token'
    });

    facebook(callBack) {
        this.auth0facebook.popup.authorize({
            connection: 'facebook',
            audience: 'https://europe-railroad/',
            // redirectUri: window.location.origin + "/auth/facebook",
            redirectUri: window.location.origin,
        }, (error, response) => this.link(error, response, callBack));
    }
}
