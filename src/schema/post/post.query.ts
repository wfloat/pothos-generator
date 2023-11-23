import { builder } from "../../builder.js";
import { PostObject } from "./post.js";
import { resolvePost, resolvePosts } from "./post.resolver.js";

builder.queryFields((t) => ({
  post: t.field({
    type: PostObject,
    resolve: resolvePost,
  }),
  posts: t.connection(
    {
      type: PostObject,
      resolve: resolvePosts,
    },
    { name: "PostConnection" },
    { name: "PostEdge" }
  ),
}));
