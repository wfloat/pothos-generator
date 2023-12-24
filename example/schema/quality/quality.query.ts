import { builder } from "../../builder.js";

builder.queryFields((t) => ({
  Quality: t.prismaField({
    type: "Quality",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.quality.load(args.id),
  }),
  Qualitys: t.prismaConnection(
    {
      type: "Quality",
      cursor: "id",
      resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "QualitysConnection" },
    { name: "QualitysEdge" }
  ),
}));
