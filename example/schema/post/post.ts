import { builder } from "../../builder.js";
import { Post } from "@prisma/client";
import "./post.query.js";
import "./post.mutation.js";

builder.prismaObject("Post", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    authorId: t.exposeID("authorId"),
    modifiedById: t.exposeID("modifiedById", { nullable: true }),
    // Relations
    author: t.relation("author", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.account.load(root.authorId),
    }),
    modifiedBy: t.relation("modifiedBy", {
      nullable: true,
      resolve: async (query, root, args, context, info) =>
        await context.loaders.account.load(root.modifiedById),
    }),
    // TODO: Connections
  }),
});

type CreatePostInputType = Omit<Post, "id">;
export const CreatePostInput =
  builder.inputRef<CreatePostInputType>("CreatePostInput");
CreatePostInput.implement({
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    authorId: t.id({ required: true }),
    modifiedById: t.id(),
  }),
});
export type CreatePostInputShape = typeof CreatePostInput.$inferInput;

type UpdatePostInputType = Required<Pick<Post, "id">> &
  Partial<Omit<Post, "id">>; // TODO: Make this cleaner
export const UpdatePostInput =
  builder.inputRef<UpdatePostInputType>("UpdatePostInput");
UpdatePostInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    title: t.string(),
    content: t.string(),
    authorId: t.id(),
    modifiedById: t.id(),
  }),
});
export type UpdatePostInputShape = typeof UpdatePostInput.$inferInput;
