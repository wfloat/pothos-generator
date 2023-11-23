import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";

export const builder = new SchemaBuilder({
  plugins: [RelayPlugin],
  relayOptions: {},
});
