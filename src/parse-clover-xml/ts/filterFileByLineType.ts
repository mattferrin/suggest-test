import { Untrusted } from "../../other/ts/Untrusted";
import { ReadCloverXmlInput } from "./readCloverXml";
import { FileArray } from "./summarizedResult";

export function filterFileByLineType(
  input: ReadCloverXmlInput,
  projectPackage: Untrusted<{
    readonly file: FileArray;
  }>
): Untrusted<FileArray> {
  switch (input.tag) {
    case "existing-balance":
      return projectPackage?.file;
    case "existing-conditionals":
    case "existing-statements":
    case "new-balance":
    case "new-conditionals":
    case "new-statements":
      return projectPackage?.file?.filter((projectPackageFile) => {
        return projectPackageFile?.line?.some((line) => {
          return line?.$?.type === "cond";
        });
      });
  }
}
