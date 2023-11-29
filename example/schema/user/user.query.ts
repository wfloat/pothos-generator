import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  User: t.prismaField({
    type: "User",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args, ctx) => undefined,
    // db.User.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  Users: t.prismaConnection(
    {
      type: "User",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
      // prisma.User.findMany({ ...query }),
    },
    { name: "UserConnection" },
    { name: "UserEdge" }
  ),
}));
