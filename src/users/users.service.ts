import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'INTERN' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'ENGINEER' },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'ADMIN',
    },
    { id: 4, name: 'Diana Moore', email: 'diana@example.com', role: 'INTERN' },
    {
      id: 5,
      name: 'Ethan Clark',
      email: 'ethan@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => (b.id - a.id));
    console.log('id', usersByHighestId);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    console.log('del', this.users)
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
