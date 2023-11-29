import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  Comment: t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args, ctx) => undefined,
    // db.Comment.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  Comments: t.prismaConnection(
    {
      type: "Comment",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
      // prisma.Comment.findMany({ ...query }),
    },
    { name: "CommentConnection" },
    { name: "CommentEdge" }
  ),
}));
