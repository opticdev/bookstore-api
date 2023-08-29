import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Authors from "../../services/authors";
import { PaginatedTypeBox } from "../../services/paginated";

const GetAuthorsResponse = PaginatedTypeBox(Authors.AuthorResponse);
type GetAuthorsResponse = Static<typeof GetAuthorsResponse>;

const GetAuthorsQuery = Type.Object({
  sortOrder: Type.Optional(
    Type.String({
      enum: ["asc", "desc"],
    })
  ),
  sortKey: Type.Optional(
    Type.String({
      enum: ["name", "created_at", "updated_at"],
    })
  ),
});
type GetAuthorsQuery = Static<typeof GetAuthorsQuery>;

export const registerGetAuthors = (app: FastifyInstance) => {
  app.get<{
    Querystring: GetAuthorsQuery;
    Reply: GetAuthorsResponse;
  }>(
    `/authors`,
    {
      schema: {
        querystring: GetAuthorsQuery,
        response: { 200: GetAuthorsResponse },
      },
    },
    (request, reply) => {
      const sort = {
        order: request.query.sortOrder ?? "asc",
        key: request.query.sortKey ?? "name",
      } as Parameters<typeof Authors.getMany>["0"];
      const authors = Authors.getMany(sort);
      reply.code(200).send({
        has_more_data: false,
        data: authors,
        next: null,
      });
    }
  );
};
