import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  Account: t.prismaField({
    type: "Account",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args, context, info) => undefined,
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
