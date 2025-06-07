import { Elysia } from "elysia";
import { UserController } from "./controllers/user.controller";
import { PostController } from "./controllers/post.controller";

const userController = new UserController();
const postController = new PostController();

const app = new Elysia()
  .onError(({ code, error }) => {
    return {
      success: false,
      error: String(error),
      code,
      timestamp: new Date().toISOString()
    };
  })
  .group("/users", app => app.use(userController.getRoutes()))
  .group("/posts", app => app.use(postController.getRoutes()))

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
