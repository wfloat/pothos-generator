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
  RelatedConnection,
  prismaPothosTypeMappings,
} from "./types.js";
import { prismaPostgresScalarMappings } from "./database.js";

function isId(field: FieldAst): boolean {
  if (field.attributes?.find((attribute) => attribute.name === "id")) {
    return true;
  } else {
    let uuidAttribute = field.attributes?.find(
      (attribute) => attribute.group === "db" && attribute.name === "Uuid"
    );
    if (uuidAttribute) {
      return true;
    } else return false;
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
  let relationAttribute = field.attributes?.find(
    (attribute) => attribute.name === "relation"
  ) as any;

  let referenceField;
  let oneToOne = false;
  if (relationAttribute) {
    referenceField = relationAttribute.args[0].value.value.args[0] as string;
  } else {
    // Mark as a 1to1 relation to be processed when the entire Schema object is back in scope
    referenceField = "";
    oneToOne = true;
  }

  return {
    name: field.name,
    relatedModel: field.fieldType as string,
    referenceField,
    required: !field.optional,
    oneToOne,
  };
}

function relatedConnectionAstToRelatedConnection(
  field: FieldAst
): RelatedConnection {
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
      !x.array && !((x.fieldType as string) in prismaPostgresScalarMappings)
  );

  let relatedConnectionsAst = fieldsAndRelations.filter(
    (x): x is FieldAst =>
      !((x.fieldType as string) in prismaPostgresScalarMappings) &&
      x.array === true
  );

  return {
    name: model.name,
    fields: fieldsAst.map((x) => fieldAstToField(x)),
    relations: relationsAst.map((x) => relationAstToRelation(x)),
    relatedConnections: relatedConnectionsAst.map((x) =>
      relatedConnectionAstToRelatedConnection(x)
    ),
  };
}

function processOneToOneRelations(schema: Schema) {
  schema.models.forEach((model) => {
    model.relations.forEach((relation) => {
      if (relation.oneToOne) {
        let relatedModel = schema.models.find(
          (x) => x.name === relation.relatedModel
        );
        if (relatedModel) {
          let parentRelation = relatedModel.relations.find(
            (x) => x.relatedModel === model.name
          );
          if (parentRelation) {
            relation.referenceField = parentRelation.referenceField;
          }
        }
      }
    });
  });
  return schema;
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
  processOneToOneRelations(schema);

  return schema;
}
