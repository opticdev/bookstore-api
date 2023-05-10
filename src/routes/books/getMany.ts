import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Books from "../../services/books";
import { PaginatedTypeBox } from "../../services/paginated";

const GetBooksResponse = PaginatedTypeBox(Books.BookResponse);
type GetBooksResponse = Static<typeof GetBooksResponse>;

const GetBooksQuery = Type.Object({
  sort_order: Type.Optional(
    Type.String({
      enum: ["asc", "desc"],
    })
  ),
  sort_key: Type.Optional(
    Type.String({
      enum: ["name", "created_at", "updated_at"],
    })
  ),
});
type GetBooksQuery = Static<typeof GetBooksQuery>;

export const registerGetBooks = (app: FastifyInstance) => {
  app.get<{
    Reply: GetBooksResponse;
    Querystring: GetBooksQuery;
  }>(
    `/books`,
    {
      schema: {
        querystring: GetBooksQuery,
        response: { 200: GetBooksResponse },
      },
    },
    (request, reply) => {
      const sort = {
        order: request.query.sort_order ?? "asc",
        key: request.query.sort_key ?? "name",
      } as Parameters<typeof Books.getMany>["0"];
      const books = Books.getMany(sort);
      reply.code(200).send({
        has_more_data: false,
        data: books,
        next: null,
      });
    }
  );
};
