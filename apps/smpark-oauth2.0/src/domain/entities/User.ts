class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public agreedScopes?: { id: boolean; email: boolean; name: boolean },
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.agreedScopes = agreedScopes;
  }
}

export default User;
