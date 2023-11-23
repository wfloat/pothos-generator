import {
  resolveCursorConnection,
  ResolveCursorConnectionArgs,
} from "@pothos/plugin-relay";
import { PothosValidationError } from "@pothos/core";

export function resolvePost(root, args, ctx) {
  return {
    id: 0,
    title: "testing",
    content: "contentValue",
  };
}

export function resolvePosts(root, args, ctx) {
  return resolveCursorConnection(
    {
      args,
      toCursor: (post) => post,
    },
    ({ before, after, limit, inverted }: ResolveCursorConnectionArgs) => []
  );
}

export function resolveCreatePost(root, args, ctx) {
  return undefined;
}

export function resolveUpdatePost(root, args, ctx) {
  return undefined;
}
