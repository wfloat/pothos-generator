import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  Comment: t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.comment.load(args.id),
  }),
  Comments: t.prismaConnection(
    {
      type: "Comment",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "CommentConnection" },
    { name: "CommentEdge" }
  ),
}));
