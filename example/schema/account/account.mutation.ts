import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { Account } from "@prisma/client";

type CreateAccountInputType = Omit<Account, "id">;
const CreateAccountInput =
  builder.inputRef<CreateAccountInputType>("CreateAccountInput");
CreateAccountInput.implement({
  fields: (t) => ({
    firstName: t.string({ required: true }),
    lastName: t.string(),
  }),
});
type CreateAccountInputShape = typeof CreateAccountInput.$inferInput;

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
const UpdateAccountInput =
  builder.inputRef<UpdateAccountInputType>("UpdateAccountInput");
UpdateAccountInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    firstName: t.string(),
    lastName: t.string(),
  }),
});
type UpdateAccountInputShape = typeof UpdateAccountInput.$inferInput;

const AccountNullability: { [K in keyof Account]: boolean } = {
  id: false,
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
        { ...args.input },
        AccountNullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("Account")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();
      return context.loaders.account.load(args.input.id);
    },
  })
);
