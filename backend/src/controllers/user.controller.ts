import { BaseCrudController, BaseModel } from "./base-crud.controller";
import prisma from "../lib/prisma";

interface User extends BaseModel {
  email: string;
  name?: string;
}

export class UserController extends BaseCrudController<User> {
  constructor() {
    super(prisma, prisma.user);
  }
} 