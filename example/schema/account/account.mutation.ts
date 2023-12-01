import { builder } from "../../builder.js";
import { CreateAccountInput, UpdateAccountInput } from "./account.js";
// import { createAccount, updateAccount } from "./account.resolver.js";

builder.mutationField("createAccount", (t) =>
t.prismaField({
    type: "Account",
    nullable: true,
    args: {
    input: t.arg({ type: CreateAccountInput, required: true }),
    },
    resolve: (root, args, context, info) => undefined,
    // createAccount(args.input),
})
);

builder.mutationField("updateAccount", (t) =>
t.prismaField({
    type: "Account",
    nullable: true,
    args: {
    input: t.arg({ type: UpdateAccountInput, required: true }),
    },
    resolve: (root, args, context, info) => undefined,
    // updateAccount(args.input),
})
);
