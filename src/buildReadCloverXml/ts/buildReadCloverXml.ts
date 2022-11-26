import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import { MeowOutput } from "../../bin/ts/cli";
import { buildSortStatements } from "./buildSortStatements";
import { buildSummarizeParsedCoverage } from "./buildSummarizeParsedCoverage";
import { passThroughLogger } from "./passThroughLogger";
import { SummaryItem, undefinedOrSummary } from "./undefinedOrSummary";

export type ReadCloverXmlOutput =
  | { readonly tag: "errors"; readonly errors: readonly Error[] }
  | {
      readonly tag: "summary";
      readonly summaryArray: ReadonlyArray<SummaryItem | undefined>;
      readonly summaryString: string | { readonly tag: "not-ready" };
    };

export function buildReadCloverXml(input: MeowOutput) {
  // eslint-disable-next-line functional/functional-parameters
  return async function readCloverXml(): Promise<ReadCloverXmlOutput> {
    return await fs
      .readFile(input.input[0] ?? "coverage/clover.xml")
      .then(parseStringPromise)
      .then(buildSummarizeParsedCoverage(input))
      .then(undefinedOrSummary)
      .then(buildSortStatements(input))
      .catch((reason): ReadCloverXmlOutput => {
        return { tag: "errors", errors: [new Error(reason)] };
      })
      .then(passThroughLogger);
  };
}
