import { MeowOutput } from "../../bin/ts/cli";
import { buildIncludeFile } from "./buildIncludeFile";
import { SummaryItem } from "./undefinedOrSummary";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: Parameters<typeof buildIncludeFile>[0];
  file: Parameters<ReturnType<typeof buildIncludeFile>>[0];
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const includeFile = buildIncludeFile(input.input);
    const result = includeFile(input.file);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: { result },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "5c9c07a3-5e29-45fe-af63-8780df887809",
  comment: "undefined file doesn't throw an error WHEN includeNotTested false",
  input: {
    flags: { includeTested: false, includeNotTested: false },
  } as MeowOutput,
  file: undefined,
});

snap({
  stabileSortId: "a036467a-aa43-438a-a54a-220cbb3539fb",
  comment: "undefined file doesn't throw an error WHEN includeNotTested true",
  input: {
    flags: { includeTested: false, includeNotTested: true },
  } as MeowOutput,
  file: undefined,
});

snap({
  stabileSortId: "5bf05b28-2df7-43a9-944b-72c65acccbb9",
  comment: "returns `true` for file because at least 1 statement is tested",
  input: {
    flags: { includeTested: true, includeNotTested: false },
  } as MeowOutput,
  file: { statements: 2, uncoveredStatements: 1 } as SummaryItem,
});

snap({
  stabileSortId: "8d1e30e7-4f17-4fee-a36c-4da484d0e25e",
  comment: "returns `true` for file because at least 1 conditional is tested",
  input: {
    flags: { includeTested: true, includeNotTested: false },
  } as MeowOutput,
  file: { conditionals: 2, uncoveredConditionals: 1 } as SummaryItem,
});

snap({
  stabileSortId: "13a1c1c6-dd44-4fc4-8102-da679ba19713",
  comment:
    "returns `true` for file because every line and conditional is not tested",
  input: {
    flags: { includeTested: false, includeNotTested: true },
  } as MeowOutput,
  file: {
    conditionals: 9,
    uncoveredConditionals: 9,
    statements: 99,
    uncoveredStatements: 99,
  } as SummaryItem,
});
