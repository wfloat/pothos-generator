import * as fs from "fs";
import * as path from "path";

export function validateSchemaPath(schemaPath: string) {
  if (fs.existsSync(schemaPath) && fs.statSync(schemaPath).isFile()) {
    return path.resolve(schemaPath);
  } else {
    console.error(
      `The specified schema file path does not exist or is not a file: ${schemaPath}`
    );
    process.exit(1);
  }
}

export function validateOutputDir(outputDir: string) {
  if (fs.existsSync(outputDir) && fs.statSync(outputDir).isDirectory()) {
    return path.resolve(outputDir);
  } else {
    console.error(
      `The specified output directory path does not exist or is not a directory: ${outputDir}`
    );
    process.exit(1);
  }
}

export function emptyDirContents(dir: string): void {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      emptyDirContents(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
}

export function writeTsFile(outputDir: string, name: string, contents: string) {
  fs.writeFileSync(`${outputDir}/${name}.ts`, contents);
}
