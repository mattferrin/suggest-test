import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import { buildSummarizeParsedCoverage } from "./summarizeParsedCoverage";
import { SummaryItem, undefinedOrSummary } from "./undefinedOrSummary";

export type ReadCloverXmlInput =
  | { readonly tag: "existing-balance" }
  | { readonly tag: "existing-conditionals" }
  | { readonly tag: "existing-statements" }
  | { readonly tag: "new-balance" }
  | { readonly tag: "new-conditionals" }
  | { readonly tag: "new-statements" };

export type ReadCloverXmlOutput =
  | { readonly tag: "errors"; readonly errors: readonly Error[] }
  | {
      readonly tag: "summary";
      readonly summary: ReadonlyArray<SummaryItem | undefined>;
    };

export function buildReadCloverXml(input: ReadCloverXmlInput) {
  // eslint-disable-next-line functional/functional-parameters
  return async function readCloverXml(): Promise<ReadCloverXmlOutput> {
    return await fs
      .readFile("../folder-structure-lint/coverage/clover.xml")
      .then(parseStringPromise)
      .then(buildSummarizeParsedCoverage(input))
      .then(undefinedOrSummary)
      .catch((reason) => {
        return { tag: "errors", errors: [new Error(reason)] };
      });
  };
}
