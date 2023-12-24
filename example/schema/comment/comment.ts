import { builder } from "../../builder.js";
import "./comment.query.js";
import "./comment.mutation.js";

builder.prismaObject("Comment", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    comment: t.exposeString("comment"),
    authorId: t.exposeID("authorId"),
    postId: t.exposeID("postId"),
    // Relations
    author: t.relation("author", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.account.load(root.authorId),
    }),
    post: t.relation("post", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.post.load(root.postId),
    }),
    quality: t.relation("quality", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        await context.loaders.qualityFromComment.load(root.id),
    }),
    // Connections
  }),
});
