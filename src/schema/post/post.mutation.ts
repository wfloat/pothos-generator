// import { builder } from "../../builder.js";
// import { PostObject } from "./post.js";
// import { Post } from "@prisma/client";
// import { createPost, updatePost } from "./post.resolver.js";
// import { CreatePostInput, UpdatePostInput } from "./post.js";

// builder.mutationField("createPost", (t) =>
//   t.field({
//     type: PostObject,
//     nullable: true,
//     args: {
//       input: t.arg({ type: CreatePostInput, required: true }),
//     },
//     resolve: (root, args, ctx) => createPost(args.input),
//   })
// );

// builder.mutationField("updatePost", (t) =>
//   t.field({
//     type: PostObject,
//     nullable: true,
//     args: {
//       input: t.arg({ type: UpdatePostInput, required: true }),
//     },
//     resolve: (root, args, ctx) => updatePost(args.input),
//   })
// );
