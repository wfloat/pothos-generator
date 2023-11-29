/* eslint-disable */
import type { Prisma, User, Post, Comment } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
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
                Shape: User;
                Name: "User";
            };
            comments: {
                Shape: Comment[];
                Name: "Comment";
            };
            modifiedBy: {
                Shape: User | null;
                Name: "User";
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
                Shape: User;
                Name: "User";
            };
            post: {
                Shape: Post;
                Name: "Post";
            };
        };
    };
}