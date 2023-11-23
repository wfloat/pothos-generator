import { builder } from "../../builder.js";
import { PostObject } from "./post.js";
import { Post } from "@prisma/client";
import { resolveCreatePost, resolveUpdatePost } from "./post.resolver.js";

type CreatePost = Omit<Post, "id">;
type UpdatePost = Partial<Post>; // TODO: Make id required while keeping the other fields optional
export const CreatePostInput = builder.inputRef<CreatePost>("CreatePostInput");
export const UpdatePostInput = builder.inputRef<UpdatePost>("UpdatePostInput");

CreatePostInput.implement({
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField("createPost", (t) =>
  t.field({
    type: PostObject,
    nullable: true,
    args: {
      input: t.arg({ type: CreatePostInput, required: true }),
    },
    resolve: resolveCreatePost,
  })
);

UpdatePostInput.implement({
  fields: (t) => ({
    id: t.int({ required: true }),
    title: t.string(),
    content: t.string(),
  }),
});

builder.mutationField("updatePost", (t) =>
  t.field({
    type: PostObject,
    nullable: true,
    args: {
      input: t.arg({ type: UpdatePostInput, required: true }),
    },
    resolve: resolveUpdatePost,
  })
);
