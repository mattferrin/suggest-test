/* eslint-disable functional/functional-parameters */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { MeowOutput } from "../../bin/ts/cli";
import { SummaryItem } from "./undefinedOrSummary";

export function summarizeIntoString(
  input: MeowOutput,
  summaryArray: ReadonlyArray<SummaryItem | undefined>
): string {
  if (!input.flags.includeConditionals && !input.flags.includeStatements) {
    return "\nBoth includeConditionals and includeStatements are false. Please let at least 1 be true.\n";
  } else {
    const entity = [
      ...(input.flags.includeConditionals ? ["conditionals"] : []),
      ...(input.flags.includeStatements ? ["statements"] : []),
    ];

    if (summaryArray.length === 0) {
      return `\nNo uncovered ${entity.join(" or ")} were found.\n`;
    } else {
      const outputLines = summaryArray.map((line) => {
        return `${line?.path ?? "MISSING/PATH"} ${new Intl.NumberFormat(
          "en-US",
          {
            maximumSignificantDigits: 2,
          }
        ).format(line?.score ?? 0)}`;
      });

      return [
        `\nFiles suggested to increase coverage of ${entity.join(" and ")}:\n`,
        ...outputLines,
        "",
      ]
        .filter((line) => line !== null)
        .join("\n");
    }
  }
}
