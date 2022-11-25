import { Untrusted } from "../../other/ts/Untrusted";
import { filterFileByLineType } from "./filterFileByLineType";
import { ReadCloverXmlInput } from "./readCloverXml";
import { FileArray, summarizedResult } from "./summarizedResult";
import { SummaryItem } from "./undefinedOrSummary";

export type Parsed = Untrusted<{
  readonly coverage: {
    readonly project: ReadonlyArray<{
      readonly package: ReadonlyArray<{
        readonly file: FileArray;
      }>;
    }>;
  };
}>;

type SummarizeParsedCoverageOutput =
  | ReadonlyArray<SummaryItem | undefined>
  | undefined;

export function buildSummarizeParsedCoverage(input: ReadCloverXmlInput) {
  return function summarizeParsedCoverage(
    parsed: Parsed
  ): SummarizeParsedCoverageOutput {
    return parsed?.coverage?.project?.flatMap((project) => {
      return project?.package?.flatMap((projectPackage) => {
        const filteredProjectPackageFile = filterFileByLineType(
          input,
          projectPackage
        );

        return summarizedResult(filteredProjectPackageFile);
      });
    });
  };
}
