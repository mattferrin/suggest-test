/* eslint-disable functional/functional-parameters */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { SummaryItem } from "./undefinedOrSummary";

export function summarizeIntoString(
  summaryArray: ReadonlyArray<SummaryItem | undefined>
): string {
  const outputLines = summaryArray.map((y) => {
    return `${y?.path ?? ""} ${y?.weightedStatements ?? 0}`;
  });

  return [
    "Files suggested to increase statement coverage of:\n",
    ...outputLines,
  ]
    .filter((x) => x !== null)
    .join("\n");
}
