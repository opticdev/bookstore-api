import { Static, Type } from "@sinclair/typebox";
import { nanoid } from "nanoid";

export const BookRequest = Type.Object({
  name: Type.String(),
  price: Type.Number(),
});
export type BookRequest = Static<typeof BookRequest>;

export const BookResponse = Type.Object({
  id: Type.String(),
  name: Type.String(),
  price: Type.Number(),
  created_at: Type.String(),
  updated_at: Type.String(),
});
export type BookResponse = Static<typeof BookResponse>;

const books: BookResponse[] = [
  {
    id: "WjE9O1d8ELCb8POiOw4pn",
    name: "Pride and Prejudice",
    price: 10,
    created_at: "2023-01-22T17:17:41.326Z",
    updated_at: "2023-01-22T17:17:41.326Z",
  },
  {
    id: "vZsYVmzdxtihxQNqCs-3f",
    name: "The Great Gatsby",
    price: 15,
    created_at: "2022-10-22T10:11:51.421Z",
    updated_at: "2022-10-22T10:11:51.421Z",
  },
  {
    id: "lqqXCWnueFQbihgZtK9a-",
    name: "To Kill a Mockingbird",
    price: 8,
    created_at: "2022-05-01T07:11:01.701Z",
    updated_at: "2022-05-12T07:18:19.127Z",
  },
  {
    id: "t_6i-nROr669AOPNE3RTq",
    name: "Nineteen Eighty-Four",
    price: 14,
    created_at: "2023-02-01T21:19:08.600Z",
    updated_at: "2023-02-01T21:19:08.600Z",
  },
];

const bookDatabase = new Map(books.map((b) => [b.id, b]));

export function update(
  id: string,
  updates: Partial<BookRequest>
): BookResponse | null {
  let book = bookDatabase.get(id);
  if (book) {
    book = {
      ...book,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    bookDatabase.set(id, book);
  }
  return book ?? null;
}

export function getMany(): BookResponse[] {
  return [...bookDatabase.values()];
}

export function get(id: string): BookResponse | null {
  return bookDatabase.get(id) ?? null;
}

export function create(bookRequest: BookRequest): BookResponse {
  const id = nanoid();
  const now = new Date().toISOString();
  const book = {
    ...bookRequest,
    id,
    created_at: now,
    updated_at: now,
  };
  bookDatabase.set(id, book);
  return book;
}
