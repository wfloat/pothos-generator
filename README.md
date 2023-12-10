# pothos-generator

Generator that emits a Pothos GraphQL schema from your defined Prisma schema. Provides enhanced type-safety and error detection when the generated GraphQL schema's state diverges from your Prisma schema.

## Usage

```bash
npm start # Assume default schema and output paths
# or
npm start -- --schema ./prisma/schema.prisma --output ./example/schema
# or
npm start -- -s ./prisma/schema.prisma -o ./example/schema
# or a subset of these arguments
```

## Prisma migrate

```bash
prisma migrate dev --name init
```

## TODO:
- Add this package for field validation: https://www.npmjs.com/package/zod-prisma-types
- Add totalCount to page Connections
- Figure out if resolvers should be async or not
- Add a relatedField to RelatedConnection types
