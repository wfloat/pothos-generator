import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
    id: Generated<number>;
    firstName: string;
    lastName: string;
};
export type Comment = {
    id: Generated<number>;
    comment: string;
    authorId: number;
    postId: number;
};
export type Post = {
    id: Generated<number>;
    title: string;
    content: string;
    authorId: number;
    modifiedById: number | null;
};
export type DB = {
    Account: Account;
    Comment: Comment;
    Post: Post;
};
