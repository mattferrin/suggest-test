import { MeowOutput } from "../../bin/ts/cli";
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
          ?.filter((file) => {
            const isStatementKeeper =
              (file?.statements ?? 0) > 1 &&
              (file?.uncoveredStatements ?? 0) > 0;
            const isConditionalKeeper =
              (file?.conditionals ?? 0) > 1 &&
              (file?.uncoveredConditionals ?? 0) > 0;

            if (!input.flags.includeConditionals) {
              return isStatementKeeper;
            } else if (!input.flags.includeStatements) {
              return isConditionalKeeper;
            } else {
              return isStatementKeeper || isConditionalKeeper;
            }
          })
          ?.sort((fileA, fileB) => {
            return (fileA?.score ?? 0) > (fileB?.score ?? 0) ? -1 : 1;
          });

        return {
          tag: "summary",
          summaryArray,
          summaryString: summarizeIntoString(input, summaryArray),
        };
      }
    }
  };
}
