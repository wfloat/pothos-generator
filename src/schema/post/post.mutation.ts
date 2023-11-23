import { builder } from "../../builder.js";
import { db } from "../../database.js";

const CreatePostInput = builder.inputType("CreatePostInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    authorId: t.int({ required: true }),
  }),
});

builder.mutationField("createPost", (t) =>
  t.prismaField({
    type: "Post",
    nullable: true,
    args: {
      input: t.arg({ type: CreatePostInput, required: true }),
    },
    resolve: (query, _, { input }) =>
      db.post.create({
        ...query,
        data: {
          ...input,
        },
      }),
  })
);
