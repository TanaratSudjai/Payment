import { PrismaClient } from "@prisma/client";
import { BaseModel } from "../models/base.model";

export class BaseService<T extends BaseModel> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findAll() {
    return this.model.findMany();
  }

  async findById(id: number) {
    return this.model.findUnique({
      where: { id }
    });
  }

  async create(data: Partial<T>) {
    return this.model.create({
      data
    });
  }

  async update(id: number, data: Partial<T>) {
    return this.model.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return this.model.delete({
      where: { id }
    });
  }
} 