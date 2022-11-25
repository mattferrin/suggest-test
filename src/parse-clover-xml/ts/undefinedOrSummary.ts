import { ReadCloverXmlOutput } from "./readCloverXml";

export interface SummaryItem {
  readonly path: string | null | undefined;
  readonly uncoveredStatements: number;
  readonly statements: number | null | undefined;
  readonly uncoveredConditionals: number;
  readonly conditionals: number | null | undefined;
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
    return { tag: "summary", summary };
  }
}
