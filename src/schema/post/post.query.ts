import { builder } from "../../builder.js";
import { PostObject } from "./post.js";

builder.queryFields((t) => ({
  post: t.field({
    type: PostObject,
    resolve: (root, args, ctx) => ({
      id: 0,
      title: "testing",
      content: "contentValue",
    }),
  }),
  // TODO: use import { resolveCursorConnection, ResolveCursorConnectionArgs } from '@pothos/plugin-relay';
  posts: t.connection(
    {
      type: PostObject,
      resolve: (parent, { first, last, before, after }) => {
        return {
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "abc",
            endCursor: "def",
          },
          edges: [],
        };
      },
    },
    { name: "PostConnection" },
    { name: "PostEdge" }
  ),
}));
