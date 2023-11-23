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

const UpdatePostInput = builder.inputType("UpdatePostInput", {
  fields: (t) => ({
    // id: t.id({ required: true }),
    title: t.string({ required: false }),
    // blah: t.string(),
  }),
});

builder.mutationField("UpdatePostInput", (t) =>
  t.prismaField({
    type: "Post",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
      input: t.arg({ type: UpdatePostInput, required: true }),
    },
    resolve: (query, _, { id, input }) => undefined,
    // db.post.update({
    //   ...query,
    //   where: { id: 1 },
    //   data: {
    //     ...input,
    //   },
    // }),
  })
);
