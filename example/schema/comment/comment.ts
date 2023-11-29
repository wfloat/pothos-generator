import { builder } from "../../builder.js";
import { Comment } from "@prisma/client";
import "./comment.query.js";
import "./comment.mutation.js";

builder.prismaObject("Comment", {
  fields: (t) => ({
    id: t.exposeID("id"),
    comment: t.exposeString("comment"),
    authorId: t.exposeInt("authorId"),
    postId: t.exposeInt("postId"),
  }),
});

type CreateCommentInputType = Omit<Comment, "id">;
export const CreateCommentInput =
  builder.inputRef<CreateCommentInputType>("CreateCommentInput");
CreateCommentInput.implement({
  fields: (t) => ({
    id: t.int({ required: true }),
    comment: t.string({ required: true }),
    authorId: t.int({ required: true }),
    postId: t.int({ required: true }),
  }),
});
export type CreateCommentInputShape = typeof CreateCommentInput.$inferInput;

type UpdateCommentInputType = Required<Pick<Comment, "id">> &
  Partial<Omit<Comment, "id">>; // TODO: Make this cleaner
export const UpdateCommentInput =
  builder.inputRef<UpdateCommentInputType>("UpdateCommentInput");
UpdateCommentInput.implement({
  fields: (t) => ({
    id: t.int({ required: true }),
    comment: t.string(),
    authorId: t.int(),
    postId: t.int(),
  }),
});
export type UpdateCommentInputShape = typeof UpdateCommentInput.$inferInput;
