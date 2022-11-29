import { MeowOutput } from "../../bin/ts/cli";
import { SummaryItem } from "./undefinedOrSummary";

export function buildIncludeFile(input: MeowOutput) {
  return function includeFile(file: SummaryItem | undefined) {
    const isTested =
      (file?.statements ?? 0) > (file?.uncoveredStatements ?? 0) ||
      (file?.conditionals ?? 0) > (file?.uncoveredConditionals ?? 0);
    const isIncludeTested = input.flags.includeTested && isTested;

    const isNotTested =
      (file?.statements ?? 0) === (file?.uncoveredStatements ?? 0) &&
      (file?.conditionals ?? 0) === (file?.uncoveredConditionals ?? 0);
    const isIncludeNotTested = input.flags.includeNotTested && isNotTested;

    return isIncludeTested || isIncludeNotTested;
  };
}
