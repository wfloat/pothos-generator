import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  Post: t.prismaField({
    type: "Post",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.post.load(args.id),
  }),
  Posts: t.prismaConnection(
    {
      type: "Post",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "PostsConnection" },
    { name: "PostsEdge" }
  ),
}));
