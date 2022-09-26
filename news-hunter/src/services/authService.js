class AuthService {
  static authService = null;

  static getInstance() {
    if (this.authService == null) {
      this.authService = new AuthService();
    }
    return this.authService;
  }

  constructor() {
    this.auth = window.catalyst.auth;
    this.zcql = window.catalyst.ZCatalystQL;
    this.userManagement = window.catalyst.userManagement;
  }

  signup(firstname, lastname, email) {
    console.log(firstname, lastname, email)
    if (firstname == "" || lastname == "" || email == "") {
      throw new Error("fill the inputs")
    }

    var data = {
      first_name: firstname,
      last_name: lastname,
      email_id: email,
      platform_type: "web",
      redirect_url: "https://" + document.domain + "/app/index.html",
    };

    console.log(data);

    return this.auth.signUp(data).then((response) => {
      if (response.status == 400) {
        throw new Error(response.message);
      } else {
        return true;
      }
    });
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.auth.signOut("https://" + document.domain + "/app/index.html",);
  }

  async isAuth() {
    try {
      await this.userManagement.getCurrentProjectUser();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default AuthService;
