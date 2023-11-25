import { builder } from "../../builder.js";
// import { createPost, updatePost } from "./post.resolver.js";
import { CreatePostInput, UpdatePostInput } from "./post.js";

builder.mutationField("createPost", (t) =>
  t.prismaField({
    type: "Post",
    nullable: true,
    args: {
      input: t.arg({ type: CreatePostInput, required: true }),
    },
    resolve: (root, args, ctx) => undefined,
    // createPost(args.input),
  })
);

builder.mutationField("updatePost", (t) =>
  t.prismaField({
    type: "Post",
    nullable: true,
    args: {
      input: t.arg({ type: UpdatePostInput, required: true }),
    },
    resolve: (root, args, ctx) => undefined,
    // updatePost(args.input),
  })
);
