export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add(name, email, password) {
    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  static isValidUser(email, password) {
    const result = users.find(
      (u) => u.email === email && u.password === password
    );
    return result;
  }

  static getUserName(email) {
    const result = users.find((u) => u.email === email);
    return result.name;
  }
}

var users = [
  {
    id: 1,
    name: 'arsh ali',
    email: 'donotdelete@gmail.com',
    password: 'localhost',
  },
];
