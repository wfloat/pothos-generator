import { builder } from "../../builder.js";
// import { createUser, updateUser } from "./user.resolver.js";

import { CreateUserInput, UpdateUserInput } from "./user.js";

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      input: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: (root, args, ctx) => undefined,
    // createUser(args.input),
  })
);

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      input: t.arg({ type: UpdateUserInput, required: true }),
    },
    resolve: (root, args, ctx) => undefined,
    // updateUser(args.input),
  })
);
