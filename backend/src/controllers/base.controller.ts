import { Elysia } from "elysia";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
  timestamp: string;
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
