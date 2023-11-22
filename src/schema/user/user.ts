import { builder } from "../../builder.js";

builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    fullName: t.string({
      resolve: (user) => `${user.firstName} ${user.lastName}`,
    }),
    posts: t.relation("posts"),
    // comments: t.relatedConnection("comments", { cursor: "id" }),
  }),
});
