import { BaseController } from "../models/base.model";
import { PostService } from "../services/post.service";

export class PostController extends BaseController {
  constructor() {
    super(new PostService());
  }
} 