import { FastifyInstance } from "fastify";
import { registerHealthCheck } from "./healthcheck";
import { registerCreateBooks } from "./books/create";
import { registerGetBooks } from "./books/getMany";

export const registerRoutes = (app: FastifyInstance) => {
  registerHealthCheck(app);

  // Books
  registerCreateBooks(app);
  registerGetBooks(app);
};
