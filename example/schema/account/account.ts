import { builder } from "../../builder.js";
import { Account } from "@prisma/client";
import "./account.query.js";
import "./account.mutation.js";

builder.prismaObject("Account", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    // Relations

    // TODO: Connections
  }),
});

type CreateAccountInputType = Omit<Account, "id">;
export const CreateAccountInput =
  builder.inputRef<CreateAccountInputType>("CreateAccountInput");
CreateAccountInput.implement({
  fields: (t) => ({
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
    id: t.id({ required: true }),
    firstName: t.string(),
    lastName: t.string(),
  }),
});
export type UpdateAccountInputShape = typeof UpdateAccountInput.$inferInput;
