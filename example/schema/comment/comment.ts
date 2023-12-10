import { builder } from "../../builder.js";
import { Comment } from "@prisma/client";
import "./comment.query.js";
import "./comment.mutation.js";

builder.prismaObject("Comment", {
  fields: (t) => ({
    // Fields
    id: t.exposeID("id"),
    comment: t.exposeString("comment"),
    authorId: t.exposeID("authorId"),
    postId: t.exposeID("postId"),
    // Relations
    author: t.relation("author", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.account.load(root.authorId),
    }),
    post: t.relation("post", {
      resolve: async (query, root, args, context, info) =>
        await context.loaders.post.load(root.postId),
    }),
    // Connections
  }),
});

type CreateCommentInputType = Omit<Comment, "id">;
export const CreateCommentInput =
  builder.inputRef<CreateCommentInputType>("CreateCommentInput");
CreateCommentInput.implement({
  fields: (t) => ({
    comment: t.string({ required: true }),
    authorId: t.id({ required: true }),
    postId: t.id({ required: true }),
  }),
});
export type CreateCommentInputShape = typeof CreateCommentInput.$inferInput;

type UpdateCommentInputType = Required<Pick<Comment, "id">> &
  Partial<Omit<Comment, "id">>; // TODO: Make this cleaner
export const UpdateCommentInput =
  builder.inputRef<UpdateCommentInputType>("UpdateCommentInput");
UpdateCommentInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    comment: t.string(),
    authorId: t.id(),
    postId: t.id(),
  }),
});
export type UpdateCommentInputShape = typeof UpdateCommentInput.$inferInput;
