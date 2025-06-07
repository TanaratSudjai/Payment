import { BaseController } from "../models/base.model";
import { UserService } from "../services/user.service";

export class UserController extends BaseController {
  constructor() {
    super(new UserService());
  }
} 