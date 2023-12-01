import {
  resolveCursorConnection,
  ResolveCursorConnectionArgs,
} from "@pothos/plugin-relay";
import {
  CreatePostInput,
  CreatePostInputShape,
  UpdatePostInput,
  UpdatePostInputShape,
} from "./post.js";

export function post(id: number) {
  return {
    id: 0,
    title: "testing",
    content: "contentValue",
  };
}

export function posts(root, args, ctx) {
  return resolveCursorConnection(
    {
      args,
      toCursor: (post) => post.id,
    },
    ({ before, after, limit, inverted }: ResolveCursorConnectionArgs) => []
  );
}

export function createPost(input: CreatePostInputShape) {
  return undefined;
}

export function updatePost(input: UpdatePostInputShape) {
  return undefined;
}
