import { writeTsFile } from "./io.js";
import {
  Model,
  Schema,
  Field,
  prismaPothosTypeMappings,
  Relation,
  RelatedConnection,
} from "./types.js";
import _ from "lodash";
import * as fs from "fs";

function generateIndex(modelNames: string[]): string {
  return `import { builder } from "../builder.js";

${modelNames.map((name) => `import "./${name}/${name}.js";`).join("\n")}

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
`;
}

function generateObjectField(field: Field) {
  let name = field.name;
  let nullable = !field.required;
  let type = field.type;
  let exposeType = `expose${_.upperFirst(type)}`;
  let nullableString = nullable ? ", { nullable: true }" : "";
  return `${name}: t.${exposeType}("${name}"${nullableString}),`;
}

function createObjectRelation(relation: Relation, model: Model) {
  let name = relation.name;
  let referenceField = relation.referenceField;
  let relatedModel = relation.relatedModel;
  let relatedModelCamel = _.camelCase(relatedModel);

  let loaderCode;
  if (relation.oneToOne) {
    loaderCode = `context.loaders.${name}From${model.name}.load(root.id)`;
  } else {
    loaderCode = `context.loaders.${relatedModelCamel}.load(root.${referenceField})`;
  }

  return `${name}: t.relation("${name}", {
  ${relation.required ? "" : "nullable: true,"}
  resolve: async (query, root, args, context, info) =>
  await ${loaderCode},
}),`;
}

const generateRandomString = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function createObjectRelatedConnection(
  connection: RelatedConnection,
  modelName: string
) {
  let name = connection.name;
  // let referenceField = relation.referenceField;
  let relatedModel = connection.relatedModel;
  let relatedModelCamel = _.camelCase(relatedModel);
  let namePascal = _.upperFirst(name);
  return `${name}: t.relatedConnection(
  "${name}",
  {
    cursor: "id",
    resolve: (query, parent, args, context, info) => undefined,
  },
  { name: "${modelName}${namePascal}Connection" },
  { name: "${modelName}${namePascal}Edge" }
),`;
}

function createFieldString(field: Field) {
  let fieldType = field.type;
  if (fieldType === "ID") {
    fieldType = "id";
  }
  let requiredString = field.required ? "{ required: true }" : "";
  return `${field.name}: t.${fieldType}(${requiredString}),`;
}

function updateFieldString(field: Field) {
  let fieldType = field.type;
  if (fieldType === "ID") {
    fieldType = "id";
  }
  return `${field.name}: t.${fieldType}(),`;
}

function generateModelTypes(model: Model) {
  let name = model.name;
  let nameKebab = _.kebabCase(model.name);
  let fields = model.fields;
  let relations = model.relations;
  let relatedConnections = model.relatedConnections;

  return `import { builder } from "../../builder.js";
import "./${nameKebab}.query.js";
import "./${nameKebab}.mutation.js";

builder.prismaObject("${name}", {
    fields: (t) => ({
    // Fields
${fields.map((field) => generateObjectField(field)).join("\n")}
    // Relations
${relations.map((relation) => createObjectRelation(relation, model)).join("\n")}
    // Connections
${relatedConnections
  .map((connection) => createObjectRelatedConnection(connection, name))
  .join("\n")}
    }),
});
`;
}

function generateModelQueries(model: Model) {
  let name = model.name;
  let nameCamel = _.camelCase(model.name);

  return `import { builder } from "../../builder.js";

builder.queryFields((t) => ({
${name}: t.prismaField({
    type: "${name}",
    nullable: true,
    args: {
    id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, context, info) =>
      await context.loaders.${nameCamel}.load(args.id),

}),
${name}s: t.prismaConnection(
    {
    type: "${name}",
    cursor: "id",
    resolve: (query, parent, args, context, info) => undefined,
    },
    { name: "${name}sConnection" },
    { name: "${name}sEdge" }
),
}));`;
}

function generateModelMutations(model: Model) {
  let name = model.name;
  let nameKebab = _.kebabCase(model.name);
  let nameCamel = _.camelCase(model.name);
  let fields = model.fields;
  let inputFields = fields.filter((field) => field.name !== "id");

  return `import { builder } from "../../builder.js";
import { db } from "../../database.js";
import { removeNullFieldsThatAreNonNullable } from "../../helpers.js";
import { ${name} } from "@prisma/client";

type Create${name}InputType = Omit<${name}, "id">;
const Create${name}Input =
    builder.inputRef<Create${name}InputType>("Create${name}Input");
Create${name}Input.implement({
    fields: (t) => ({
${inputFields.map((field) => createFieldString(field)).join("\n")}
    }),
});
type Create${name}InputShape = typeof Create${name}Input.$inferInput;

builder.mutationField("create${name}", (t) =>
t.prismaField({
    type: "${name}",
    nullable: false,
    args: {
    input: t.arg({ type: Create${name}Input, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const result = await db
        .insertInto("${name}")
        .values(args.input)
        .returning(["id"])
        .executeTakeFirstOrThrow();
      return context.loaders.${nameCamel}.load(result.id);
    },
})
);

type Update${name}InputType = Required<Pick<${name}, "id">> &
    Partial<Omit<${name}, "id">>; // TODO: Make this cleaner
const Update${name}Input =
    builder.inputRef<Update${name}InputType>("Update${name}Input");
Update${name}Input.implement({
    fields: (t) => ({
    id: t.id({ required: true }),
    ${inputFields.map((field) => updateFieldString(field)).join("\n")}
    }),
});
type Update${name}InputShape = typeof Update${name}Input.$inferInput;

const ${name}Nullability: { [K in keyof ${name}]: boolean } = {
  ${fields.map((field) => `${field.name}: ${!field.required}`).join(",\n")}
};

builder.mutationField("update${name}", (t) =>
t.prismaField({
    type: "${name}",
    nullable: false,
    args: {
    input: t.arg({ type: Update${name}Input, required: true }),
    },
    resolve: async (query, parent, args, context, info) => {
      const input = removeNullFieldsThatAreNonNullable<${name}>(
        { ...args.input },
        ${name}Nullability
      );
      input.id = undefined;

      const result = await db
        .updateTable("${name}")
        .set(input)
        .where("id", "=", args.input.id)
        .executeTakeFirstOrThrow();
      return context.loaders.${nameCamel}.load(args.input.id);
    },
})
);
`;
}

function generateModelDefinition(model: Model, outputDir: string) {
  let modelKebab = _.kebabCase(model.name);
  let modelOutDir = `${outputDir}/${modelKebab}`;
  fs.mkdirSync(modelOutDir);

  let typesContent = generateModelTypes(model);
  writeTsFile(modelOutDir, modelKebab, typesContent);

  let queryContent = generateModelQueries(model);
  writeTsFile(modelOutDir, `${modelKebab}.query`, queryContent);

  let mutationContent = generateModelMutations(model);
  writeTsFile(modelOutDir, `${modelKebab}.mutation`, mutationContent);
}

export function generatePothosSchema(schema: Schema, outputDir: string) {
  let models = schema.models;

  let indexContent = generateIndex(models.map((x) => _.kebabCase(x.name)));
  writeTsFile(outputDir, "index", indexContent);

  models.map((model) => {
    generateModelDefinition(model, outputDir);
  });
}
