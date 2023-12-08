import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  Account: t.prismaField({
    type: "Account",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }), // TODO: make this an int in the generator
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.account.load(args.id),
    // db.Account.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  Accounts: t.prismaConnection(
    {
      type: "Account",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
      // prisma.Account.findMany({ ...query }),
    },
    { name: "AccountConnection" },
    { name: "AccountEdge" }
  ),
}));
