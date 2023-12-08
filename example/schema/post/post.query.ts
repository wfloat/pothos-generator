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
    // db.Post.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  Posts: t.prismaConnection(
    {
      type: "Post",
      cursor: "id",
      resolve: async (query, parent, args, context, info) => undefined,
      // prisma.Post.findMany({ ...query }),
    },
    { name: "PostConnection" },
    { name: "PostEdge" }
  ),
}));
