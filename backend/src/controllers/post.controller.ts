import { BaseCrudController, BaseModel } from "./base-crud.controller";
import prisma from "../lib/prisma";

interface Post extends BaseModel {
  title: string;
  content?: string;
  published: boolean;
}

export class PostController extends BaseCrudController<Post> {
  constructor() {
    super(prisma, prisma.post);
  }
} 