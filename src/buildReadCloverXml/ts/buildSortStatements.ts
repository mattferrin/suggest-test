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
          ?.filter((file) => (file?.statements ?? 0) > 1)
          ?.sort((fileA, fileB) => {
            if (
              fileB?.statements === null ||
              fileB?.statements === undefined ||
              fileA?.statements === null ||
              fileA?.statements === undefined
            ) {
              return -1;
            } else {
              return fileA.weightedStatements > fileB.weightedStatements
                ? -1
                : 1;
            }
          });

        return {
          tag: "summary",
          summaryArray,
          summaryString: summarizeIntoString(summaryArray),
        };
      }
    }
  };
}
