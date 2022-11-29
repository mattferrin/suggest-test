import { MeowOutput } from "../../bin/ts/cli";
import { buildIncludeFile } from "./buildIncludeFile";
import { buildIncludeKind } from "./buildIncludeKind";
import { ReadCloverXmlOutput } from "./buildReadCloverXml";
import { summarizeIntoString } from "./summarizeIntoString";

export function buildSortStatements(input: MeowOutput) {
  return function sortStatements(
    output: ReadCloverXmlOutput
  ): ReadCloverXmlOutput {
    switch (output.tag) {
      case "errors":
        return output;
      case "summary": {
        const summaryArray = output.summaryArray
          ?.filter(buildIncludeKind(input))
          ?.filter(buildIncludeFile(input))
          ?.sort((fileA, fileB) => {
            return (fileA?.score ?? 0) > (fileB?.score ?? 0) ? -1 : 1;
          })
          .slice(0, input.flags.maxItems ?? 32);

        return {
          tag: "summary",
          summaryArray,
          summaryString: summarizeIntoString(input, summaryArray),
        };
      }
    }
  };
}
