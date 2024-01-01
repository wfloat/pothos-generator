import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "../prisma/generated/pothos.js";

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    loaders: any; // TODO: Add to a context type
  };
  Scalars: {
    ID: {
      Output: string;
      Input: string;
    };
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    // cursorFieldOptions: {
    //   type: "String",
    // },
  },
  prisma: {
    client: prisma,
  },
});
