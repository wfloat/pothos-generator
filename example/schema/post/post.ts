import { builder } from "../../builder.js";
import { Post } from "@prisma/client";
import "./post.query.js";
import "./post.mutation.js";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    author: t.relation("author"),
    authorId: t.exposeFloat("authorId"),
    comments: t.relation("comments"),
  }),
});

type CreatePostInputType = Omit<Post, "id">;
export const CreatePostInput =
  builder.inputRef<CreatePostInputType>("CreatePostInput");
CreatePostInput.implement({
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    authorId: t.float({ required: true }),
  }),
});
export type CreatePostInputShape = typeof CreatePostInput.$inferInput;

type UpdatePostInputType = Required<Pick<Post, "id">> &
  Partial<Omit<Post, "id">>; // TODO: Make this cleaner
export const UpdatePostInput =
  builder.inputRef<UpdatePostInputType>("UpdatePostInput");
UpdatePostInput.implement({
  fields: (t) => ({
    id: t.int({ required: true }),
    title: t.string(),
    content: t.string(),
    authorId: t.float(),
  }),
});
export type UpdatePostInputShape = typeof UpdatePostInput.$inferInput;
