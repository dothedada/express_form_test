class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;

    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  search(param) {
    const results = new Set();
    for (const [_, user] of Object.entries(this.storage)) {
      if (
        user.firstName.includes(param) ||
        user.lastName.includes(param) ||
        user.email.includes(param)
      ) {
        results.add(user);
      }
    }
    return [...results];
  }
}

const usersStorage = new UsersStorage();

export { usersStorage };
