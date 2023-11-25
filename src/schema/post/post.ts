import { builder } from "../../builder.js";
import "./post.query.js";
import "./post.mutation.js";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    author: t.relation("author"),
    comments: t.relation("comments"),
  }),
});
