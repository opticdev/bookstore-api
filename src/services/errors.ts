import { Static, Type } from "@sinclair/typebox";

export const NotFound = Type.Object({ message: Type.String() });
export type NotFound = Static<typeof NotFound>;
