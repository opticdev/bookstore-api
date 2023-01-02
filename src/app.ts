import Fastify from "fastify";
import openapi from "@fastify/swagger";
import { registerRoutes } from "./routes";

export const setupApp = async () => {
  const app = Fastify();

  const opticUrl = {
    "x-optic-url":
      "https://app.useoptic.com/organizations/32613bcd-704e-4661-85f0-7b3d75613fb0/apis/Ru2Me4G-2nIro-cj4Bbib",
  };

  await app.register(openapi, {
    openapi: {
      openapi: "3.1.3",
      info: {
        title: "Bookstore API",
        version: "1.0.0",
        description: "The API for books",
      },
      servers: [
        { url: "https://api.bookstore.com", description: "Production server" },
      ],
      ...opticUrl,
    },
  });

  registerRoutes(app);

  await app.ready();

  return app;
};
