/* eslint-disable */
import type { Prisma, Account, Post, Comment } from "@prisma/client";
export default interface PrismaTypes {
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: {};
        Update: {};
        RelationName: "modifiedPosts" | "posts" | "comments";
        ListRelations: "modifiedPosts" | "posts" | "comments";
        Relations: {
            modifiedPosts: {
                Shape: Post[];
                Name: "Post";
            };
            posts: {
                Shape: Post[];
                Name: "Post";
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: "author" | "comments" | "modifiedBy";
        ListRelations: "comments";
        Relations: {
            author: {
                Shape: Account;
                Name: "Account";
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
            };
            modifiedBy: {
                Shape: Account | null;
                Name: "Account";
            };
        };
    };
    Comment: {
        Name: "Comment";
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Select: Prisma.CommentSelect;
        OrderBy: Prisma.CommentOrderByWithRelationInput;
        WhereUnique: Prisma.CommentWhereUniqueInput;
        Where: Prisma.CommentWhereInput;
        Create: {};
        Update: {};
        RelationName: "author" | "post";
        ListRelations: never;
        Relations: {
            author: {
                Shape: Account;
                Name: "Account";
            };
            post: {
                Shape: Post;
                Name: "Post";
            };
        };
    };
}