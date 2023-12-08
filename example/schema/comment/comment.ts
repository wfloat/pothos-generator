import { builder } from "../../builder.js";
import { Comment } from "@prisma/client";
import "./comment.query.js";
import "./comment.mutation.js";

builder.prismaObject("Comment", {
  fields: (t) => ({
    id: t.exposeString("id"),
    comment: t.exposeString("comment"),
    authorId: t.exposeString("authorId"),
    postId: t.exposeString("postId"),
  }),
});

type CreateCommentInputType = Omit<Comment, "id">;
export const CreateCommentInput =
  builder.inputRef<CreateCommentInputType>("CreateCommentInput");
CreateCommentInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    comment: t.string({ required: true }),
    authorId: t.string({ required: true }),
    postId: t.string({ required: true }),
  }),
});
export type CreateCommentInputShape = typeof CreateCommentInput.$inferInput;

type UpdateCommentInputType = Required<Pick<Comment, "id">> &
  Partial<Omit<Comment, "id">>; // TODO: Make this cleaner
export const UpdateCommentInput =
  builder.inputRef<UpdateCommentInputType>("UpdateCommentInput");
UpdateCommentInput.implement({
  fields: (t) => ({
    id: t.string({ required: true }),
    comment: t.string(),
    authorId: t.string(),
    postId: t.string(),
  }),
});
export type UpdateCommentInputShape = typeof UpdateCommentInput.$inferInput;
