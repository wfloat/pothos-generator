import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  post: t.prismaField({
    type: "Post",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, root, args, context, info) => undefined,
    // db.post.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  posts: t.prismaConnection(
    {
      type: "Post",
      cursor: "id",
      resolve: async (query, parent, args, context, info) => undefined,
      // prisma.post.findMany({ ...query }),
    },
    { name: "PostConnection" },
    { name: "PostEdge" }
  ),
}));
