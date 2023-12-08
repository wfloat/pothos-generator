import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  comment: t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.comment.load(args.id),
    // db.post.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  comments: t.prismaConnection(
    {
      type: "Comment",
      cursor: "id",
      resolve: async (query, parent, args, context, info) => undefined,
      // prisma.post.findMany({ ...query }),
    },
    { name: "CommentConnection" },
    { name: "CommentEdge" }
  ),
}));
