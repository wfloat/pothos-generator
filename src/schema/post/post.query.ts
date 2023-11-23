import { builder } from "../../builder.js";
import { PostObject } from "./post.js";
import { post, posts } from "./post.resolver.js";

builder.queryFields((t) => ({
  post: t.field({
    type: PostObject,
    args: {
      id: t.arg
    }
    resolve: (root, { id }, ctx) => post(id),
  }),
  posts: t.connection(
    {
      type: PostObject,
      resolve: posts,
    },
    { name: "PostConnection" },
    { name: "PostEdge" }
  ),
}));
