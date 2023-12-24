import { builder } from "../../builder.js";
import "./account.query.js";
import "./account.mutation.js";

builder.prismaObject("Account", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName", { nullable: true }),
    // Relations

    // Connections
    modifiedPosts: t.relatedConnection(
      "modifiedPosts",
      {
        cursor: "id",
        resolve: (query, parent, args, context, info) => undefined,
      },
      { name: "AccountModifiedPostsConnection" },
      { name: "AccountModifiedPostsEdge" }
    ),
    posts: t.relatedConnection(
      "posts",
      {
        cursor: "id",
        resolve: (query, parent, args, context, info) => undefined,
      },
      { name: "AccountPostsConnection" },
      { name: "AccountPostsEdge" }
    ),
    comments: t.relatedConnection(
      "comments",
      {
        cursor: "id",
        resolve: (query, parent, args, context, info) => undefined,
      },
      { name: "AccountCommentsConnection" },
      { name: "AccountCommentsEdge" }
    ),
  }),
});
