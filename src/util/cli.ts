import { program } from "commander";

export function setupCommandLineOptions(
  defaultSchemaPath: string,
  defaultOutputDir: string
) {
  program
    .option(
      "-s, --schema <type>",
      "path to a Prisma schema file",
      defaultSchemaPath
    )
    .option(
      "-o, --output <type>",
      "path to a schema output directory",
      defaultOutputDir
    );

  program.parse(process.argv);
  return program.opts();
}
