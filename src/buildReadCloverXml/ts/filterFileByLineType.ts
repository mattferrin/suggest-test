import { MeowOutput } from "../../bin/ts/cli";
import { FileArray } from "./summarizedResult";
import { Untrusted } from "./Untrusted";

export function filterFileByLineType(
  input: MeowOutput,
  projectPackage: Untrusted<{
    readonly file: FileArray;
  }>
): Untrusted<FileArray> {
  if (!input.flags.includeStatements) {
    return projectPackage?.file?.filter((projectPackageFile) => {
      return projectPackageFile?.line?.some((line) => {
        return line?.$?.type === "cond";
      });
    });
  } else {
    return projectPackage?.file;
  }
}
