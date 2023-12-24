import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { Post } from "@prisma/client";

type CreatePostInputType = Omit<Post, "id">;
const CreatePostInput = builder.inputRef<CreatePostInputType>("CreatePostInput");
CreatePostInput.implement({
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.string({ required: true }),
    authorId: t.id({ required: true }),
    editorId: t.id(),
  }),
});
type CreatePostInputShape = typeof CreatePostInput.$inferInput;

builder.mutationField("createPost", (t) =>
  t.prismaField({
    type: "Post",
    nullable: false,
    args: {
      input: t.arg({ type: CreatePostInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("Post")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();
      return context.loaders.post.load(result.id);
    },
  })
);

type UpdatePostInputType = Required<Pick<Post, "id">> & Partial<Omit<Post, "id">>; // TODO: Make this cleaner
const UpdatePostInput = builder.inputRef<UpdatePostInputType>("UpdatePostInput");
UpdatePostInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    title: t.string(),
    content: t.string(),
    authorId: t.id(),
    editorId: t.id(),
  }),
});
type UpdatePostInputShape = typeof UpdatePostInput.$inferInput;

const PostNullability: { [K in keyof Post]: boolean } = {
  id: false,
  title: false,
  content: false,
  authorId: false,
  editorId: true,
};

builder.mutationField("updatePost", (t) =>
  t.prismaField({
    type: "Post",
    nullable: false,
    args: {
      input: t.arg({ type: UpdatePostInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<Post>({ ...args.input }, PostNullability);
      input.id = undefined;

      const result = await db
        .updateTable("Post")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();
      return context.loaders.post.load(args.input.id);
    },
  })
);
