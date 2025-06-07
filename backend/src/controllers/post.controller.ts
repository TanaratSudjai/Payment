import { Model, BaseModel } from "../models/base.model";
import prisma from "../lib/prisma";

interface Post extends BaseModel {
  title: string;
  content?: string;
  published: boolean;
}

export class PostController extends Model<Post> {
  constructor() {
    super(prisma, prisma.post);
  }
} 