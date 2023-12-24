import { builder } from "../../builder.js";
import "./quality.query.js";
import "./quality.mutation.js";

builder.prismaObject("Quality", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    score: t.exposeInt("score"),
    commentId: t.exposeID("commentId"),
    // Relations
    comment: t.relation("comment", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.comment.load(root.commentId),
    }),
    // Connections
  }),
});
