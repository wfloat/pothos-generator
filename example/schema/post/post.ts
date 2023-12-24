import { builder } from "../../builder.js";
import "./post.query.js";
import "./post.mutation.js";

builder.prismaObject("Post", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    authorId: t.exposeID("authorId"),
    editorId: t.exposeID("editorId", { nullable: true }),
    // Relations
    author: t.relation("author", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.account.load(root.authorId),
    }),
    editor: t.relation("editor", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        root.editorId ? await context.loaders.account.load(root.editorId) : null,
    }),
    // Connections
    comments: t.relatedConnection(
      "comments",
      {
        cursor: "id",
        resolve: (query, parent, args, context, info) => undefined,
      },
      { name: "PostCommentsConnection" },
      { name: "PostCommentsEdge" }
    ),
  }),
});
