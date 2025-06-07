import { BaseService } from "./base.service";
import prisma from "../lib/prisma";
import { User } from "../models/user.model";

export class UserService extends BaseService<User> {
  constructor() {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string) {
    return this.model.findUnique({
      where: { email }
    });
  }

  async createUser(data: Partial<User>) {
    const existingUser = await this.findByEmail(data.email!);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    return this.create(data);
  }

  async updateUser(id: number, data: Partial<User>) {
    if (data.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already exists");
      }
    }

    return this.update(id, data);
  }
} 