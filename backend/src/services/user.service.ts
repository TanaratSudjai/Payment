import { BaseService } from "../models/base.model";
import prisma from "../lib/prisma";
import { User } from "../models/user.model";

export class UserService extends BaseService<User> {
  constructor() {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error("Email is required");
    }
    return this.model.findUnique({
      where: { email }
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    if (!data.email) {
      throw new Error("Email is required");
    }

    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    return this.create(data);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    if (!id) {
      throw new Error("User ID is required");
    }

    if (data.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already exists");
      }
    }

    return this.update(id, data);
  }

  async deleteUser(id: number): Promise<User> {
    if (!id) {
      throw new Error("User ID is required");
    }

    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return this.delete(id);
  }
} 