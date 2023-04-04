import { FastifyInstance } from "fastify";
import { registerHealthCheck } from "./healthcheck";
import { registerCreateBooks } from "./books/create";
import { registerGetBooks } from "./books/getMany";
import { registerGetBook } from "./books/get";
import { registerPatchBook } from "./books/patch";
import { registerGetAuthors } from "./authors/getMany";
import { registerCreateAuthors } from "./authors/create";

export const registerRoutes = (app: FastifyInstance) => {
  registerHealthCheck(app);

  // Books
  registerCreateBooks(app);
  registerGetBooks(app);
  registerGetBook(app);
  registerPatchBook(app);

  // authors
  registerCreateAuthors(app);
  registerGetAuthors(app);
};
