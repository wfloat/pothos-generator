import { builder } from "../../builder.js";
import { Post } from "@prisma/client";
import "./post.query.js";
import "./post.mutation.js";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeString("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    authorId: t.exposeString("authorId"),
    modifiedById: t.exposeString("modifiedById", { nullable: true }),
  }),
});

type CreatePostInputType = Omit<Post, "id">;
export const CreatePostInput =
  builder.inputRef<CreatePostInputType>("CreatePostInput");
CreatePostInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    authorId: t.string({ required: true }),
    modifiedById: t.string(),
  }),
});
export type CreatePostInputShape = typeof CreatePostInput.$inferInput;

type UpdatePostInputType = Required<Pick<Post, "id">> &
  Partial<Omit<Post, "id">>; // TODO: Make this cleaner
export const UpdatePostInput =
  builder.inputRef<UpdatePostInputType>("UpdatePostInput");
UpdatePostInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    title: t.string(),
    content: t.string(),
    authorId: t.string(),
    modifiedById: t.string(),
  }),
});
export type UpdatePostInputShape = typeof UpdatePostInput.$inferInput;
