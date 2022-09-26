class AuthRepository {
  static authRepo = null;

  static getInstance(authService) {
    if (this.authRepo == null) {
      this.authRepo = new AuthRepository(authService);
    }
    return this.authRepo;
  }

  constructor(authService) {
    this.authService = authService;
  }

  signup(firstname, lastname, email) {
    return this.authService.signup(firstname, lastname, email);
  }
}

export default AuthRepository;
