import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  comment: t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args, ctx) => undefined,
    // db.post.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  comments: t.prismaConnection(
    {
      type: "Comment",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
      // prisma.post.findMany({ ...query }),
    },
    { name: "CommentConnection" },
    { name: "CommentEdge" }
  ),
}));
