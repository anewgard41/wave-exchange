import decode from "jwt-decode";

// create a new class to instantiate the auth methods for the user
class AuthService {
  // retrieve user data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  loggedIn() {
    // check if there is a saved token and it's still valid
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }
  // check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      console.log(decoded);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("expired check failed! Line 30: auth.js");
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
