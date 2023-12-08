import DataLoader from "dataloader";
import { db } from "./database.js";
// import { Post, Account } from "@prisma/client";
// import { Account } from "../prisma/generated/kysely.js";

// TODO: Add to a context type
export function createLoaders() {
  return {
    // TODO: Add type to ids
    // TODO: Make these use the same query functions instead of having their own
    account: new DataLoader((ids: any) =>
      db
        .selectFrom("Account")
        .selectAll()
        .where("id", "in", ids)
        .execute()
        .then((rows) => ids.map((id: any) => rows.find((x) => x.id === id)))
    ),
    post: new DataLoader((ids: any) =>
      db
        .selectFrom("Post")
        .selectAll()
        .where("id", "in", ids)
        .execute()
        .then((rows) => ids.map((id: any) => rows.find((x) => x.id === id)))
    ),
    comment: new DataLoader((ids: any) =>
      db
        .selectFrom("Comment")
        .selectAll()
        .where("id", "in", ids)
        .execute()
        .then((rows) => ids.map((id: any) => rows.find((x) => x.id === id)))
    ),
  };
}
