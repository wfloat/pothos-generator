import { parsePrismaCursor } from "@pothos/plugin-prisma";
import { builder } from "../../builder.js";
import { db } from "../../database.js";

builder.queryFields((t) => ({
  Account: t.prismaField({
    type: "Account",
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, root, args, context, info) => undefined,
    // db.Account.findUnique({
    //   ...query,
    //   where: { id: Number.parseInt(String(args.id), 10) },
    // }),
  }),
  Accounts: t.prismaConnection(
    {
      type: "Account",
      cursor: "id",
      resolve: (query, parent, args, context, info) => {
        let cursorParsed = parsePrismaCursor(
          "R1BDOlM6MjE4OWNkNzctMDU3MS00NTY5LTllNjgtOTMzYzRlZTc5NDdh"
        ) as string;
        console.log(cursorParsed);
        return db
          .selectFrom("Account")
          .selectAll()
          .where("id", ">", cursorParsed)
          .limit(5)
          .execute();
        // return [
        //   {
        //     id: "2189cd77-0571-4569-9e68-933c4ee7947a",
        //     firstName: "Bob",
        //     lastName: "Ross",
        //     poopy: "poopydata",
        //   },
        //   {
        //     id: "c5fb7260-f9a6-46fa-9a02-4049efea4f88",
        //     firstName: "Hello",
        //     lastName: "World",
        //   },
        //   {
        //     id: "354e1b5e-2d34-433b-895b-62e3a27833c6",
        //     firstName: "Darth",
        //     lastName: "Vader",
        //   },
        // ];
      },
      // prisma.Account.findMany({ ...query }),
    },
    { name: "AccountConnection" },
    { name: "AccountEdge" }
  ),
}));
