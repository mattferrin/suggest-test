import { MeowOutput } from "../../bin/ts/cli";
import * as buildIncludeFile from "./buildIncludeFile";
import * as buildIncludeKind from "./buildIncludeKind";
import { ReadCloverXmlOutput } from "./buildReadCloverXml";
import { buildSortStatements } from "./buildSortStatements";
import * as summarizeIntoString from "./summarizeIntoString";
import { SummaryItem } from "./undefinedOrSummary";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: Parameters<typeof buildSortStatements>[0];
  output: Parameters<ReturnType<typeof buildSortStatements>>[0];
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */
    const summarizeIntoStringSpy = jest
      .spyOn(summarizeIntoString, "summarizeIntoString")
      .mockImplementation(() => "summarizeIntoString result");
    const buildIncludeKindSpy = jest
      .spyOn(buildIncludeKind, "buildIncludeKind")
      .mockImplementation(() => () => true);
    const buildIncludeFileSpy = jest
      .spyOn(buildIncludeFile, "buildIncludeFile")
      .mockImplementation(() => () => true);

    /** unit under test */
    const sortStatements = buildSortStatements(input.input);
    const result = sortStatements(input.output);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
        summarizeIntoStringCalls: summarizeIntoStringSpy.mock.calls,
        buildIncludeKindCalls: buildIncludeKindSpy.mock.calls,
        buildIncludeFileCalls: buildIncludeFileSpy.mock.calls,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "3d99af10-0b75-4cb9-a3b0-2358555af621",
  comment: "returns errors result with error item",
  input: "not relevant" as any,
  output: { tag: "errors", errors: [new Error("expect this errors item")] },
});
snap({
  stabileSortId: "d117a7b1-b287-4943-906b-2cc8f1369786",
  comment: "forwards empty `summaryArray`",
  input: { flags: { maxItems: 1 } } as MeowOutput,
  output: {
    tag: "summary",
    summaryArray: [],
    summaryString: "not relevant",
  } as ReadCloverXmlOutput,
});
snap({
  stabileSortId: "675ec71a-2b9b-49f8-89d4-44a72839266b",
  comment: "sorts score 2 into top position",
  input: { flags: { maxItems: 1 } } as MeowOutput,
  output: {
    tag: "summary",
    summaryArray: [{ score: 1 }, { score: 2 }] as SummaryItem[],
    summaryString: "not relevant",
  } as ReadCloverXmlOutput,
});
snap({
  stabileSortId: "41c5f18b-0f55-406e-8e8f-9048a6b442d4",
  comment: "does NOT error when files undefined",
  input: { flags: { maxItems: 2 } } as MeowOutput,
  output: {
    tag: "summary",
    summaryArray: [undefined, undefined, undefined] as undefined[],
    summaryString: "not relevant",
  } as ReadCloverXmlOutput,
});
snap({
  stabileSortId: "3b12967f-716b-4913-abfb-ff07fbaf9428",
  comment: "does NOT error when score undefined",
  input: { flags: { maxItems: 3 } } as MeowOutput,
  output: {
    tag: "summary",
    summaryArray: [{}, {}] as SummaryItem[],
    summaryString: "not relevant",
  } as ReadCloverXmlOutput,
});
