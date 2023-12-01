import { builder } from "../builder.js";

import "./account/account.js";
import "./post/post.js";
import "./comment/comment.js";

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
