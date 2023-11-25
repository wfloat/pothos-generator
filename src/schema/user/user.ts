import { builder } from "../../builder.js";
import "./user.query.js";
import "./user.mutation.js";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    posts: t.relation("posts"),
    comments: t.relation("comments"),
  }),
});
