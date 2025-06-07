import { Model, BaseModel } from "../models/base.model";
import prisma from "../lib/prisma";

interface User extends BaseModel {
  email: string;
  name?: string;
}

export class UserController extends Model<User> {
  constructor() {
    super(prisma, prisma.user);
  }
} 