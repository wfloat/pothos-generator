import { builder } from "../../builder.js";
import { PostObject } from "./post.js";
// import { db } from "../../database.js";

builder.queryFields((t) => ({
  post: t.field({
    type: PostObject,
    resolve: (root, args, ctx) => ({
      id: 0,
      title: "testing",
      content: "contentValue",
    }),
  }),
}));

// builder.queryFields((t) => ({
//   post: t.prismaField({
//     type: "Post",
//     nullable: true,
//     args: {
//       id: t.arg.id({ required: true }),
//     },
//     resolve: (query, root, args) =>
//       db.post.findUnique({
//         ...query,
//         where: { id: Number.parseInt(String(args.id), 10) },
//       }),
//   }),
//   posts: t.prismaConnection({
//     type: "Post",
//     cursor: "id",
//     resolve: (query) =>
//       db.post.findMany({
//         ...query,
//       }),
//   }),
//   // user: t.prismaField({
//   //   type: "User",
//   //   nullable: true,
//   //   args: {
//   //     id: t.arg.id({ required: true }),
//   //   },
//   //   resolve: (query, root, args) => undefined,
//   //   // db.user.findUnique({
//   //   //   ...query,
//   //   //   where: { id: Number.parseInt(String(args.id), 10) },
//   //   // }),
//   // }),
// }));
