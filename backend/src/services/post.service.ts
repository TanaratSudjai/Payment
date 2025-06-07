import { BaseService } from "../models/base.model";
import prisma from "../lib/prisma";
import { Post } from "../models/post.model";

export class PostService extends BaseService<Post> {
  constructor() {
    super(prisma, prisma.post);
  }

  async findByTitle(title: string): Promise<Post | null> {
    if (!title) {
      throw new Error("Title is required");
    }
    return this.model.findFirst({
      where: { title }
    });
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    if (!data.title) {
      throw new Error("Title is required");
    }

    const existingPost = await this.findByTitle(data.title);
    if (existingPost) {
      throw new Error("Title already exists");
    }

    return this.create(data);
  }

  async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    if (!id) {
      throw new Error("Post ID is required");
    }

    if (data.title) {
      const existingPost = await this.findByTitle(data.title);
      if (existingPost && existingPost.id !== id) {
        throw new Error("Title already exists");
      }
    }

    return this.update(id, data);
  }

  async deletePost(id: number): Promise<Post> {
    if (!id) {
      throw new Error("Post ID is required");
    }

    const post = await this.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    return this.delete(id);
  }
} 