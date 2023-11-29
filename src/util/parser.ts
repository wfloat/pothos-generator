import {
  getSchema,
  Model as ModelAst,
  Field as FieldAst,
} from "@mrleebo/prisma-ast";
import * as fs from "fs";
import {
  Schema,
  Model,
  Field,
  Relation,
  prismaPothosTypeMappings,
} from "./types.js";
import { prismaPostgresScalarMappings } from "./database.js";

function isId(field: FieldAst): boolean {
  if (field.attributes?.find((attribute) => attribute.name === "id")) {
    return true;
  } else {
    return false;
  }
}

export function prismaToPothosType(field: FieldAst) {
  if (isId(field)) {
    return prismaPothosTypeMappings["Id"];
  } else {
    let type = field.fieldType as string;
    let pothosType = prismaPothosTypeMappings[type];
    if (field.array) {
      pothosType = `${pothosType}List`;
    }
    return pothosType;
  }
}

function fieldAstToField(field: FieldAst): Field {
  return {
    name: field.name,
    type: prismaToPothosType(field),
    required: !field.optional,
    array: field.array,
  };
}

function relationAstToRelation(field: FieldAst): Relation {
  return {
    name: field.name,
    relatedModel: field.fieldType as string,
  };
}

function modelAstToModel(model: ModelAst): Model {
  let fieldsAndRelations = model.properties.filter(
    (x): x is FieldAst => x.type === "field"
  );

  let fieldsAst = fieldsAndRelations.filter(
    (x): x is FieldAst =>
      (x.fieldType as string) in prismaPostgresScalarMappings
  );

  let relationsAst = fieldsAndRelations.filter(
    (x): x is FieldAst =>
      !((x.fieldType as string) in prismaPostgresScalarMappings)
  );

  return {
    name: model.name,
    fields: fieldsAst.map((x) => fieldAstToField(x)),
    relations: relationsAst.map((x) => relationAstToRelation(x)),
  };
}

export function parsePrismaSchema(schemaPath: string): Schema {
  let schemaString = fs.readFileSync(schemaPath, "utf-8");
  let schemaAst = getSchema(schemaString);

  let modelsAst = schemaAst.list.filter(
    (x): x is ModelAst => x.type === "model"
  );

  let schema: Schema = {
    models: modelsAst.map((x) => modelAstToModel(x)),
  };
  return schema;
}
