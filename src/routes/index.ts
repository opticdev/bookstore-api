import { FastifyInstance } from "fastify";
import { registerHealthCheck } from "./healthcheck";
import { registerCreateBooks } from "./books/create";
import { registerGetBooks } from "./books/getMany";
import { registerGetBook } from "./books/get";

export const registerRoutes = (app: FastifyInstance) => {
  registerHealthCheck(app);

  // Books
  registerCreateBooks(app);
  registerGetBooks(app);
  registerGetBook(app);
};
