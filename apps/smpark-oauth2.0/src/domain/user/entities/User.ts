import BaseId from '@domain/shared/value-objects/BaseId';
import BaseScope, { IScope } from '@domain/shared/value-objects/BaseScope';
import Email from '@domain/user/value-objects/Email';
import Name from '@domain/user/value-objects/Name';
import Password from '@domain/user/value-objects/Password';

class User {
  #id: BaseId;
  #name: Name;
  #email: Email;
  #password: Password;
  #agreedScope?: BaseScope;

  private constructor(
    id: BaseId,
    password: Password,
    name: Name,
    email: Email,
    agreedScope?: BaseScope,
  ) {
    this.#id = id;
    this.#password = password;
    this.#name = name;
    this.#email = email;
    this.#agreedScope = agreedScope;
  }

  get id(): BaseId {
    return this.#id;
  }

  get password(): Password {
    return this.#password;
  }

  get name(): Name {
    return this.#name;
  }

  get email(): Email {
    return this.#email;
  }

  get agreedScope(): BaseScope | undefined {
    return this.#agreedScope;
  }

  changePassword(newPassword: string): void {
    this.#password = new Password(newPassword);
  }

  updateName(newName: Name): void {
    this.#name = newName;
  }

  updateEmail(newEmail: Email): void {
    this.#email = newEmail;
  }

  agreeToScope(newScope: BaseScope): void {
    this.#agreedScope = newScope;
  }

  hasAgreedToScope(scope: keyof IScope): boolean {
    return this.#agreedScope?.hasScope(scope) ?? false;
  }

  static create(data: {
    id?: string;
    password?: string;
    name?: string;
    email?: string;
    agreedScope?: IScope;
  }): User {
    return new User(
      BaseId.validate(data.id),
      Password.validate(data.password),
      Name.validate(data.name),
      Email.validate(data.email),
      data.agreedScope ? BaseScope.validate(data.agreedScope) : undefined,
    );
  }

  static validateUserId(id?: string): BaseId {
    return BaseId.validate(id);
  }

  static createScope(scope: IScope): BaseScope {
    return BaseScope.validate(scope);
  }

  static credentialsUser(id?: string, password?: string): { id: BaseId; password: Password } {
    return { id: new BaseId(id), password: new Password(password) };
  }
}

export default User;
