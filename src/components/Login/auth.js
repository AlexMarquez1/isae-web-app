class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(cb, data) {
    //   this.authenticated = true;
        localStorage.setItem('isae_session', JSON.stringify(data));
        cb();
    }
  
    logout(cb) {
    //   this.authenticated = false;
        localStorage.removeItem("isae_session");
        cb();
    }
  
    isAuthenticated() {
    //   return this.authenticated;
    return localStorage.getItem('isae_session') ? true : false;
    }

    getAuthenticated() {
        return localStorage.getItem('isae_session');
    }
  }
  
  export default new Auth();
  