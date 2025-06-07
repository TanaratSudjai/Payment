import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
  timestamp: string;
}

export interface BaseModel {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseService<T extends BaseModel> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findUnique({
      where: { id }
    });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create({
      data
    });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<T> {
    return this.model.delete({
      where: { id }
    });
  }
}

export class BaseController {
  protected app: Elysia;
  protected service: BaseService<any>;

  constructor(service: BaseService<any>) {
    this.app = new Elysia();
    this.service = service;
    this.initializeRoutes();
  }

  public getRoutes(): Elysia {
    return this.app;
  }

  protected successResponse<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
  }

  protected errorResponse(message: string, details?: any): ApiResponse {
    return {
      success: false,
      error: message,
      details,
      timestamp: new Date().toISOString()
    };
  }

  protected initializeRoutes(): void {
    this.app
      .get("/", async () => {
        try {
          const records = await this.service.findAll();
          return this.successResponse(records);
        } catch (error) {
          return this.errorResponse("Failed to fetch records", error);
        }
      })
      .get("/:id", async ({ params: { id } }) => {
        try {
          const record = await this.service.findById(Number(id));
          if (!record) {
            return this.errorResponse("Record not found");
          }
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to fetch record", error);
        }
      })
      .post("/", async ({ body }) => {
        try {
          const record = await this.service.create(body as any);
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to create record", error);
        }
      })
      .put("/:id", async ({ params: { id }, body }) => {
        try {
          const record = await this.service.update(Number(id), body as any);
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to update record", error);
        }
      })
      .delete("/:id", async ({ params: { id } }) => {
        try {
          const record = await this.service.delete(Number(id));
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to delete record", error);
        }
      });
  }
} 