import { FastifyInstance } from "fastify";
import { Static } from "@sinclair/typebox";

import * as Books from "../../services/books";
import { PaginatedTypeBox } from "../../services/paginated";

const GetBooksResponse = PaginatedTypeBox(Books.BookResponse);
type GetBooksResponse = Static<typeof GetBooksResponse>;

export const registerGetBooks = (app: FastifyInstance) => {
  app.get<{
    Reply: GetBooksResponse;
  }>(
    `/books`,
    {
      schema: {
        response: { 200: GetBooksResponse },
      },
    },
    (request, reply) => {
      const books = Books.getMany();
      reply.code(200).send({
        has_more_data: false,
        data: books,
        next: null,
      });
    }
  );
};
