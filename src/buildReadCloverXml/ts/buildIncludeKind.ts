import { MeowOutput } from "../../bin/ts/cli";
import { SummaryItem } from "./undefinedOrSummary";

export function buildIncludeKind(input: MeowOutput) {
  return function includeKind(file: SummaryItem | undefined) {
    if (file === undefined) {
      return false;
    } else {
      const isStatementKeeper =
        (file.statements ?? 0) > 0 && file.uncoveredStatements > 0;
      const isConditionalKeeper =
        (file.conditionals ?? 0) > 0 && file.uncoveredConditionals > 0;

      if (!input.flags.includeConditionals) {
        return isStatementKeeper;
      } else if (!input.flags.includeStatements) {
        return isConditionalKeeper;
      } else {
        return isStatementKeeper || isConditionalKeeper;
      }
    }
  };
}
