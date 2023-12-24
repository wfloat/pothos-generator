import { builder } from "../../builder.js";

builder.queryFields((t) => ({
Account: t.prismaField({
    type: "Account",
    nullable: true,
    args: {
    id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.account.load(args.id),

}),
Accounts: t.prismaConnection(
    {
    type: "Account",
    cursor: "id",
    resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "AccountsConnection" },
    { name: "AccountsEdge" }
),
}));