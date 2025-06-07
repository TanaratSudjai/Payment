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

export class BaseController {
  protected app: Elysia;

  constructor() {
    this.app = new Elysia();
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
}

export class Model<T extends BaseModel> extends BaseController {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    super();
    this.prisma = prisma;
    this.model = model;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.app
      .get("/", async () => {
        try {
          const records = await this.model.findMany();
          return this.successResponse(records);
        } catch (error) {
          return this.errorResponse("Failed to fetch records", error);
        }
      })
      .get("/:id", async ({ params: { id } }) => {
        try {
          const record = await this.model.findUnique({
            where: { id: Number(id) }
          });
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
          const record = await this.model.create({
            data: body
          });
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to create record", error);
        }
      })
      .put("/:id", async ({ params: { id }, body }) => {
        try {
          const record = await this.model.update({
            where: { id: Number(id) },
            data: body
          });
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to update record", error);
        }
      })
      .delete("/:id", async ({ params: { id } }) => {
        try {
          const record = await this.model.delete({
            where: { id: Number(id) }
          });
          return this.successResponse(record);
        } catch (error) {
          return this.errorResponse("Failed to delete record", error);
        }
      });
  }
} 