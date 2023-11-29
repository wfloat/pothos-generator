import { builder } from "../builder.js";

import "./user/user.js";
import "./post/post.js";
import "./comment/comment.js";

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
