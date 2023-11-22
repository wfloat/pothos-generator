import { builder } from "../../builder.js";
import "./post.query.js";

builder.prismaNode("Post", {
  id: { field: "id" },
  fields: (t) => ({
    title: t.exposeString("title"),
    content: t.exposeString("content"),
    author: t.relation("author"),
    comments: t.relation("comments"),
  }),
});