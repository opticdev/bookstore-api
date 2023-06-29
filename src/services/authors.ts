import { Static, Type } from "@sinclair/typebox";
import { nanoid } from "nanoid";

export const AuthorRequest = Type.Object({
  name: Type.String(),
});
export type AuthorRequest = Static<typeof AuthorRequest>;

export const AuthorResponse = Type.Object({
  id: Type.String(),
  name: Type.String(),
  date_of_birth: Type.Optional(Type.String()),
  created_at: Type.String(),
  updated_at: Type.String(),
});
export type AuthorResponse = Static<typeof AuthorResponse>;

const Authors: AuthorResponse[] = [
  {
    id: "6nTxAFM5ck4Hob77hGQoL",
    name: "Jane Austen",
    date_of_birth: "1775-12-16T12:00:00.000Z",
    created_at: "2023-04-22T17:17:41.326Z",
    updated_at: "2023-04-22T17:17:41.326Z",
  },
  {
    id: "NjpTwgmENj11rGdUgpCQ9",
    name: "F. Scott Fitzgerald",
    date_of_birth: "1896-09-24T12:00:00.000Z",
    created_at: "2023-03-22T10:11:51.421Z",
    updated_at: "2023-03-22T10:11:51.421Z",
  },
  {
    id: "AcSwiQryWBeQqcNBqBg43",
    name: "Harper Lee",
    date_of_birth: "1926-04-28T12:00:00.000Z",
    created_at: "2023-04-01T07:11:01.701Z",
    updated_at: "2023-04-01T07:11:01.701Z",
  },
  {
    id: "tNpOpQZbxytxTxDT15GQy",
    name: "George Orwell",
    date_of_birth: "1903-06-25T12:00:00.000Z",
    created_at: "2023-03-11T21:19:08.600Z",
    updated_at: "2023-03-11T21:19:08.600Z",
  },
];

const authorDatabase = new Map(Authors.map((b) => [b.id, b]));

export function update(
  id: string,
  updates: Partial<AuthorRequest>
): AuthorResponse | null {
  let author = authorDatabase.get(id);
  if (author) {
    author = {
      ...author,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    authorDatabase.set(id, author);
  }
  return author ?? null;
}

export function getMany(): AuthorResponse[] {
  return [...authorDatabase.values()];
}

export function get(id: string): AuthorResponse | null {
  return authorDatabase.get(id) ?? null;
}

export function create(AuthorRequest: AuthorRequest): AuthorResponse {
  const id = nanoid();
  const now = new Date().toISOString();
  const Author = {
    ...AuthorRequest,
    id,
    created_at: now,
    updated_at: now,
  };
  authorDatabase.set(id, Author);
  return Author;
}
