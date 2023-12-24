/* eslint-disable */
import type { Prisma, Account, Post, Comment, Quality } from "@prisma/client";
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
    RelationName: "author" | "comments" | "editor";
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
      editor: {
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
    RelationName: "author" | "post" | "quality";
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
      quality: {
        Shape: Quality | null;
        Name: "Quality";
      };
    };
  };
  Quality: {
    Name: "Quality";
    Shape: Quality;
    Include: Prisma.QualityInclude;
    Select: Prisma.QualitySelect;
    OrderBy: Prisma.QualityOrderByWithRelationInput;
    WhereUnique: Prisma.QualityWhereUniqueInput;
    Where: Prisma.QualityWhereInput;
    Create: {};
    Update: {};
    RelationName: "comment";
    ListRelations: never;
    Relations: {
      comment: {
        Shape: Comment;
        Name: "Comment";
      };
    };
  };
}
