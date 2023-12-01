import DataLoader from "dataloader";
import { db } from "./database.js";

export function createLoaders() {
  return {
    // user: new DataLoader((ids) =>
    //   db
    //     .table("users")
    //     .whereIn("id", ids)
    //     .select()
    //     .then((rows) => ids.map((id) => rows.find((x) => x.id === id)))
    // ),
    // story: new DataLoader((ids) =>
    //   db
    //     .table("stories")
    //     .whereIn("id", ids)
    //     .select()
    //     .then((rows) => ids.map((id) => rows.find((x) => x.id === id)))
    // ),
    // storiesByUserId: new DataLoader((ids) =>
    //   db.selectFrom("Account").selectAll().where
    //     .table("stories")
    //     .whereIn("author_id", ids)
    //     .select()
    //     .then((rows) => ids.map((id) => rows.filter((x) => x.author_id === id)))
    // ),
  };
}
