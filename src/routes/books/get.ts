import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Books from "../../services/books";
import * as Errors from "../../services/errors";

const GetBookParams = Type.Object({
  bookId: Type.String(),
});
type GetBookParams = Static<typeof GetBookParams>;

export const registerGetBook = (app: FastifyInstance) => {
  app.get<{
    Params: GetBookParams;
    Reply: Books.BookResponse | Errors.NotFound;
  }>(
    `/books/:bookId`,
    {
      schema: {
        params: GetBookParams,
        response: { 200: Books.BookResponse, 404: Errors.NotFound },
      },
    },
    (request, reply) => {
      const book = Books.get(request.params.bookId);
      if (!book) {
        reply.code(404).send({ message: "Not Found" });
      } else {
        reply.code(200).send(book);
      }
    }
  );
};
