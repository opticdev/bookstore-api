import { FastifyInstance } from "fastify";
import * as Books from "../../services/books";

export const registerCreateBooks = (app: FastifyInstance) => {
  app.post<{
    Body: Books.BookRequest;
    Reply: Books.BookResponse;
  }>(
    `/books`,
    {
      schema: {
        body: Books.BookRequest,
        response: { 200: Books.BookResponse },
      },
    },
    (request, reply) => {
      const book = Books.create(request.body);
      reply.code(200).send(book);
    }
  );
};
