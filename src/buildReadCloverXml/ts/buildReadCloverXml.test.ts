import fs from "fs/promises";
import xml2js from "xml2js";
import { MeowOutput } from "../../bin/ts/cli";
import { buildReadCloverXml } from "./buildReadCloverXml";
import * as buildSortStatements from "./buildSortStatements";
import * as buildSummarizeParsedCoverage from "./buildSummarizeParsedCoverage";
import * as passThroughLogger from "./passThroughLogger";
import * as undefinedOrSummary from "./undefinedOrSummary";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: Parameters<typeof buildReadCloverXml>[0];
  readFileResult: jest.MockResult<typeof fs.readFile>;
  buildSortStatementsResult: jest.MockResult<typeof buildSortStatements>;
}): void {
  it(input.stabileSortId, async () => {
    /** setup mocks */
    const readFileSpy = jest
      .spyOn(fs, "readFile")
      .mockImplementation((async () => {
        if (input.readFileResult.type === "throw") {
          throw input.readFileResult.value;
        } else {
          return input.readFileResult.value;
        }
      }) as any);
    const parseStringPromiseSpy = jest
      .spyOn(xml2js, "parseStringPromise")
      .mockImplementation(async () => {
        return "parseStringPromise result";
      });
    const buildSummarizeParsedCoverageSpy = jest
      .spyOn(buildSummarizeParsedCoverage, "buildSummarizeParsedCoverage")
      .mockImplementation((() => {
        return async () => "buildSummarizeParsedCoverage result";
      }) as any);
    const undefinedOrSummarySpy = jest
      .spyOn(undefinedOrSummary, "undefinedOrSummary")
      .mockImplementation((async () => {
        return "undefinedOrSummary result";
      }) as any);
    const buildSortStatementsSpy = jest
      .spyOn(buildSortStatements, "buildSortStatements")
      .mockImplementation((() => {
        return async () => {
          if (input.buildSortStatementsResult.type === "throw") {
            throw input.buildSortStatementsResult.value;
          } else {
            return input.buildSortStatementsResult.value;
          }
        };
      }) as any);
    const passThroughLoggerSpy = jest
      .spyOn(passThroughLogger, "passThroughLogger")
      .mockImplementation((passThrough: any) => {
        return passThrough;
      });

    /** unit under test */
    const readCloverXml = buildReadCloverXml(input.input);
    const result = await readCloverXml();

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
        readFileCalls: readFileSpy.mock.calls,
        parseStringPromiseCalls: parseStringPromiseSpy.mock.calls,
        buildSummarizeParsedCoverageCalls:
          buildSummarizeParsedCoverageSpy.mock.calls,
        undefinedOrSummaryCalls: undefinedOrSummarySpy.mock.calls,
        buildSortStatementsCalls: buildSortStatementsSpy.mock.calls,
        passThroughLoggerCalls: passThroughLoggerSpy.mock.calls,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "dacaa33f-3d63-432b-81a2-9928a564de69",
  comment: "NO errors AND calls into every step",
  input: { flags: { cloverPath: "input flags cloverPath" } } as MeowOutput,
  readFileResult: {
    type: "return",
    value: "readFile result" as any,
  },
  buildSortStatementsResult: {
    type: "return",
    value: "buildSortStatements result" as any,
  },
});

snap({
  stabileSortId: "d4863a04-0517-4a79-97f5-b8f79bbedb7e",
  comment: "throws error just before catch AND logs it",
  input: { flags: { cloverPath: "input flags cloverPath" } } as MeowOutput,
  readFileResult: {
    type: "return",
    value: "readFile result" as any,
  },
  buildSortStatementsResult: {
    type: "throw",
    value: "buildSortStatements error" as any,
  },
});

snap({
  stabileSortId: "b67e77c1-a87e-4a20-8745-2750f57d61a5",
  comment: "throws error on first call AND logs it",
  input: { flags: { cloverPath: "input flags cloverPath" } } as MeowOutput,
  readFileResult: {
    type: "throw",
    value: "readFileResult error" as any,
  },
  buildSortStatementsResult: {
    type: "return",
    value: "buildSortStatements result" as any,
  },
});
