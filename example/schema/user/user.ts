import { builder } from "../../builder.js";
import { User } from "@prisma/client";
import "./user.query.js";
import "./user.mutation.js";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
  }),
});

type CreateUserInputType = Omit<User, "id">;
export const CreateUserInput =
  builder.inputRef<CreateUserInputType>("CreateUserInput");
CreateUserInput.implement({
  fields: (t) => ({
    id: t.int({ required: true }),
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
  }),
});
export type CreateUserInputShape = typeof CreateUserInput.$inferInput;

type UpdateUserInputType = Required<Pick<User, "id">> &
  Partial<Omit<User, "id">>; // TODO: Make this cleaner
export const UpdateUserInput =
  builder.inputRef<UpdateUserInputType>("UpdateUserInput");
UpdateUserInput.implement({
  fields: (t) => ({
    id: t.int({ required: true }),
    firstName: t.string(),
    lastName: t.string(),
  }),
});
export type UpdateUserInputShape = typeof UpdateUserInput.$inferInput;
