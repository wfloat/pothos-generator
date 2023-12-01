import { builder } from "../../builder.js";
import { CreatePostInput, UpdatePostInput } from "./post.js";
// import { createPost, updatePost } from "./post.resolver.js";

builder.mutationField("createPost", (t) =>
t.prismaField({
    type: "Post",
    nullable: true,
    args: {
    input: t.arg({ type: CreatePostInput, required: true }),
    },
    resolve: (root, args, context, info) => undefined,
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
    resolve: (root, args, context, info) => undefined,
    // updatePost(args.input),
})
);
