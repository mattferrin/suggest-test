import { ReadCloverXmlOutput } from "./buildReadCloverXml";

export interface SummaryItem {
  readonly conditionals: number | null | undefined;
  readonly path: string | null | undefined;
  readonly statements: number | null | undefined;
  readonly uncoveredConditionals: number;
  readonly uncoveredStatements: number;
  readonly score: number;
  readonly hasUnmarkedConditional: boolean;
}

export function undefinedOrSummary(
  summary: ReadonlyArray<SummaryItem | undefined> | undefined
): ReadCloverXmlOutput {
  if (summary === undefined || summary === null) {
    return {
      tag: "errors",
      errors: [
        new Error(
          "The parsed clover.xml has an undefined or null property somewhere"
        ),
      ],
    };
  } else {
    return {
      tag: "summary",
      summaryArray: summary,
      summaryString: { tag: "not-ready" },
    };
  }
}
