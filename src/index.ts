import { setupCommandLineOptions } from "./util/cli.js";
import { validateSchemaPath, validateOutputDir, emptyDirContents } from "./util/io.js";
import { generatePothosSchema } from "./util/generator.js";
import { parsePrismaSchema } from "./util/parser.js";

function main() {
  const DEFAULT_SCHEMA_PATH = "./prisma/schema.prisma";
  const DEFAULT_OUTPUT_DIR = "./example/schema/";

  const options = setupCommandLineOptions(DEFAULT_SCHEMA_PATH, DEFAULT_OUTPUT_DIR);

  const schemaPath = validateSchemaPath(options.schema);
  const outputDir = validateOutputDir(options.output);
  console.log(`Prisma Schema File Path: ${schemaPath}`);
  console.log(`Output Directory: ${outputDir}`);

  emptyDirContents(outputDir);
  let schema = parsePrismaSchema(schemaPath);
  generatePothosSchema(schema, outputDir);
}

main();
