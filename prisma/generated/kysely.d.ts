import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
    id: Generated<string>;
    firstName: string;
    lastName: string;
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
    modifiedById: string | null;
};
export type DB = {
    Account: Account;
    Comment: Comment;
    Post: Post;
};
