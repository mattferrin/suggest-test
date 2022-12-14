import { MeowOutput } from "../../bin/ts/cli";
import { FileArray, summarizedResult } from "./summarizedResult";
import { SummaryItem } from "./undefinedOrSummary";
import { Untrusted } from "./Untrusted";

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

export function buildSummarizeParsedCoverage(input: MeowOutput) {
  return function summarizeParsedCoverage(
    parsed: Parsed
  ): SummarizeParsedCoverageOutput {
    return parsed?.coverage?.project?.flatMap((project) => {
      return project?.package?.flatMap((projectPackage) => {
        return summarizedResult(input, projectPackage?.file);
      });
    });
  };
}
