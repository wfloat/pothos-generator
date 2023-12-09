export type Field = {
  name: string;
  type: string;
  required: boolean;
  array?: boolean;
};

export type Relation = {
  name: string;
  relatedModel: string;
  referenceField: string;
  required: boolean;
};

export type RelatedConnection = {
  name: string;
  relatedModel: string;
};

export type Model = {
  name: string;
  fields: Field[];
  relations: Relation[];
  relatedConnections: RelatedConnection[];
};

export type Schema = {
  models: Model[];
};

export const prismaPothosTypeMappings: { [key: string]: string } = {
  Id: "ID",
  String: "string",
  Boolean: "boolean",
  Int: "int",
  Float: "float",
  //   BigInt: "int",
  //   Decimal: "float",
  //   DateTime: "string",
  //   Json: "string",
  //   Bytes: "intList",
};
