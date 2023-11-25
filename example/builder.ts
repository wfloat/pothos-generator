import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

const prisma = new PrismaClient({});

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
});
