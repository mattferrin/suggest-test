import { MeowOutput } from "../../bin/ts/cli";
import { SummaryItem } from "./undefinedOrSummary";

export function buildIncludeKind(input: MeowOutput) {
  return function includeKind(file: SummaryItem | undefined) {
    const isStatementKeeper =
      (file?.statements ?? 0) > 1 && (file?.uncoveredStatements ?? 0) > 0;
    const isConditionalKeeper =
      (file?.conditionals ?? 0) > 1 && (file?.uncoveredConditionals ?? 0) > 0;

    if (!input.flags.includeConditionals) {
      return isStatementKeeper;
    } else if (!input.flags.includeStatements) {
      return isConditionalKeeper;
    } else {
      return isStatementKeeper || isConditionalKeeper;
    }
  };
}
