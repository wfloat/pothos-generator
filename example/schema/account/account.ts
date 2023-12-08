import { builder } from "../../builder.js";
import { Account } from "@prisma/client";
import "./account.query.js";
import "./account.mutation.js";

builder.prismaObject("Account", {
  fields: (t) => ({
    id: t.exposeString("id"), // TODO: make this an int in the generator
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
  }),
});

type CreateAccountInputType = Omit<Account, "id">;
export const CreateAccountInput =
  builder.inputRef<CreateAccountInputType>("CreateAccountInput");
CreateAccountInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    firstName: t.string({ required: true }),
    lastName: t.string({ required: true }),
  }),
});
export type CreateAccountInputShape = typeof CreateAccountInput.$inferInput;

type UpdateAccountInputType = Required<Pick<Account, "id">> &
  Partial<Omit<Account, "id">>; // TODO: Make this cleaner
export const UpdateAccountInput =
  builder.inputRef<UpdateAccountInputType>("UpdateAccountInput");
UpdateAccountInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    firstName: t.string(),
    lastName: t.string(),
  }),
});
export type UpdateAccountInputShape = typeof UpdateAccountInput.$inferInput;
