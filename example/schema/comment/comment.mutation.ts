import { builder } from "../../builder.js";
import { CreateCommentInput, UpdateCommentInput } from "./comment.js";
// import { createComment, updateComment } from "./comment.resolver.js";

builder.mutationField("createComment", (t) =>
  t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      input: t.arg({ type: CreateCommentInput, required: true }),
    },
    resolve: (root, args, ctx) => undefined,
    // createComment(args.input),
  })
);

builder.mutationField("updateComment", (t) =>
  t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      input: t.arg({ type: UpdateCommentInput, required: true }),
    },
    resolve: (root, args, ctx) => undefined,
    // updateComment(args.input),
  })
);
