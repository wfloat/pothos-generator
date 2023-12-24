import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { Account } from "@prisma/client";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
// import { CreateAccountInput, UpdateAccountInput, UpdateAccountInputShape } from "./account.js";

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

builder.mutationField("createAccount", (t) =>
  t.prismaField({
    type: "Account",
    nullable: false,
    args: {
      input: t.arg({ type: CreateAccountInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("Account")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();
      return context.loaders.account.load(result.id);
    },
  })
);

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

const AccountNullability: { [K in keyof Account]?: boolean } = {
  firstName: false,
  lastName: true,
};

builder.mutationField("updateAccount", (t) =>
  t.prismaField({
    type: "Account",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateAccountInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<Account>(
        args.input,
        AccountNullability
      );

      const result = await db
        .updateTable("Account")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirst();
      return context.loaders.account.load(args.input.id);
    },
  })
);
