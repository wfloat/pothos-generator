import { db } from "../database.js";
import { builder } from "../builder.js";

import "./user/user.js";
import "./post/post.js";
import "./comment/comment.js";

// builder.queryType({
//   fields: (t) => ({
//     post: t.prismaField({
//       type: "Post",
//       nullable: true,
//       args: {
//         id: t.arg.id({ required: true }),
//       },
//       resolve: (query, root, args) =>
//         db.post.findUnique({
//           ...query,
//           where: { id: Number.parseInt(String(args.id), 10) },
//         }),
//     }),
//     posts: t.prismaConnection({
//       type: "Post",
//       cursor: "id",
//       resolve: (query) =>
//         db.post.findMany({
//           ...query,
//         }),
//     }),
//     user: t.prismaField({
//       type: "User",
//       nullable: true,
//       args: {
//         id: t.arg.id({ required: true }),
//       },
//       resolve: (query, root, args) => undefined,
//       // db.user.findUnique({
//       //   ...query,
//       //   where: { id: Number.parseInt(String(args.id), 10) },
//       // }),
//     }),
//   }),
// });

export const schema = builder.toSchema();
