import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { Quality } from "@prisma/client";

type CreateQualityInputType = Omit<Quality, "id">;
const CreateQualityInput =
  builder.inputRef<CreateQualityInputType>("CreateQualityInput");
CreateQualityInput.implement({
  fields: (t) => ({
    score: t.int({ required: true }),
    commentId: t.id({ required: true }),
  }),
});
type CreateQualityInputShape = typeof CreateQualityInput.$inferInput;

builder.mutationField("createQuality", (t) =>
  t.prismaField({
    type: "Quality",
    nullable: false,
    args: {
      input: t.arg({ type: CreateQualityInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("Quality")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();
      return context.loaders.quality.load(result.id);
    },
  })
);

type UpdateQualityInputType = Required<Pick<Quality, "id">> &
  Partial<Omit<Quality, "id">>; // TODO: Make this cleaner
const UpdateQualityInput =
  builder.inputRef<UpdateQualityInputType>("UpdateQualityInput");
UpdateQualityInput.implement({
  fields: (t) => ({
    id: t.id({ required: true }),
    score: t.int(),
    commentId: t.id(),
  }),
});
type UpdateQualityInputShape = typeof UpdateQualityInput.$inferInput;

const QualityNullability: { [K in keyof Quality]: boolean } = {
  id: false,
  score: false,
  commentId: false,
};

builder.mutationField("updateQuality", (t) =>
  t.prismaField({
    type: "Quality",
    nullable: false,
    args: {
      input: t.arg({ type: UpdateQualityInput, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<Quality>(
        { ...args.input },
        QualityNullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("Quality")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();
      return context.loaders.quality.load(args.input.id);
    },
  })
);
