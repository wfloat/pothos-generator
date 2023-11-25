import { builder } from "../../builder.js";
import "./comment.query.js";
import "./comment.mutation.js";

builder.prismaObject("Comment", {
  fields: (t) => ({
    id: t.exposeID("id"),
    comment: t.exposeString("comment"),
    author: t.relation("author"),
    post: t.relation("post"),
  }),
});
