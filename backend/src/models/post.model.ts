import { BaseModel } from "./base.model";

export interface Post extends BaseModel {
  title: string;
  content?: string;
  published: boolean;
} 