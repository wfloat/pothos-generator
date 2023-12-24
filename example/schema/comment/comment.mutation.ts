import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { Comment } from "@prisma/client";

type CreateCommentInputType = Omit<Comment, "id">;
const CreateCommentInput = builder.inputRef<CreateCommentInputType>("CreateCommentInput");
CreateCommentInput.implement({
  fields: (t) => ({
    comment: t.string({ required: true }),
    authorId: t.id({ required: true }),
    postId: t.id({ required: true }),
  }),
});
type CreateCommentInputShape = typeof CreateCommentInput.$inferInput;

builder.mutationField("createComment", (t) =>
  t.prismaField({
    type: "Comment",
    nullable: false,
    args: {
      input: t.arg({ type: CreateCommentInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("Comment")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();
      return context.loaders.comment.load(result.id);
    },
  })
);

type UpdateCommentInputType = Required<Pick<Comment, "id">> & Partial<Omit<Comment, "id">>; // TODO: Make this cleaner
const UpdateCommentInput = builder.inputRef<UpdateCommentInputType>("UpdateCommentInput");
UpdateCommentInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    comment: t.string(),
    authorId: t.id(),
    postId: t.id(),
  }),
});
type UpdateCommentInputShape = typeof UpdateCommentInput.$inferInput;

const CommentNullability: { [K in keyof Comment]: boolean } = {
  id: false,
  comment: false,
  authorId: false,
  postId: false,
};

builder.mutationField("updateComment", (t) =>
  t.prismaField({
    type: "Comment",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateCommentInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<Comment>(
        { ...args.input },
        CommentNullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("Comment")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();
      return context.loaders.comment.load(args.input.id);
    },
  })
);
