import { writeTsFile } from "./io.js";
import { Model, Schema, Field, prismaPothosTypeMappings } from "./types.js";
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

function createFieldString(field: Field) {
  let requiredString = field.required ? "{ required: true }" : "";
  return `${field.name}: t.${field.type}(${requiredString}),`;
}

function updateFieldString(field: Field) {
  return `${field.name}: t.${field.type}(),`;
}

function generateModelTypes(model: Model) {
  let name = model.name;
  let nameKebab = _.kebabCase(model.name);
  let fields = model.fields;
  let inputFields = fields.filter((field) => field.type !== "ID");

  return `import { builder } from "../../builder.js";
import { ${name} } from "@prisma/client";
import "./${nameKebab}.query.js";
import "./${nameKebab}.mutation.js";

builder.prismaObject("${name}", {
    fields: (t) => ({
${fields.map((field) => generateObjectField(field)).join("\n")}
    }),
});

type Create${name}InputType = Omit<${name}, "id">;
export const Create${name}Input =
    builder.inputRef<Create${name}InputType>("Create${name}Input");
Create${name}Input.implement({
    fields: (t) => ({
        id: t.int({ required: true }),
${inputFields.map((field) => createFieldString(field)).join("\n")}
    }),
});
export type Create${name}InputShape = typeof Create${name}Input.$inferInput;

type Update${name}InputType = Required<Pick<${name}, "id">> &
    Partial<Omit<${name}, "id">>; // TODO: Make this cleaner
export const Update${name}Input =
    builder.inputRef<Update${name}InputType>("Update${name}Input");
Update${name}Input.implement({
    fields: (t) => ({
    id: t.int({ required: true }),
    ${inputFields.map((field) => updateFieldString(field)).join("\n")}
    }),
});
export type Update${name}InputShape = typeof Update${name}Input.$inferInput;
`;
}

function generateModelDefinition(model: Model, outputDir: string) {
  let modelKebab = _.kebabCase(model.name);
  let modelOutDir = `${outputDir}/${modelKebab}`;
  fs.mkdirSync(modelOutDir);

  let typesContent = generateModelTypes(model);
  writeTsFile(modelOutDir, modelKebab, typesContent);

  //   let queryContent = generateModelQueries(model);
  //   writeTsFile(modelOutDir, modelNameKebab, typesContent);

  //   let mutationContent = generateModelMutations(model);
  //   writeTsFile(modelOutDir, modelNameKebab, typesContent);
}

export function generatePothosSchema(schema: Schema, outputDir: string) {
  let models = schema.models;

  let indexContent = generateIndex(models.map((x) => _.kebabCase(x.name)));
  writeTsFile(outputDir, "index", indexContent);

  models.map((model) => {
    generateModelDefinition(model, outputDir);
  });
}
