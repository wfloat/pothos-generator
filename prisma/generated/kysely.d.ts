import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  id: Generated<string>;
  firstName: string;
  lastName: string | null;
};
export type Comment = {
  id: Generated<string>;
  comment: string;
  authorId: string;
  postId: string;
};
export type Post = {
  id: Generated<string>;
  title: string;
  content: string;
  authorId: string;
  editorId: string | null;
};
export type Quality = {
  id: Generated<string>;
  score: number;
  commentId: string;
};
export type DB = {
  Account: Account;
  Comment: Comment;
  Post: Post;
  Quality: Quality;
};
