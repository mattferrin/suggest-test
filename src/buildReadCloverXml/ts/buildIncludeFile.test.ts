import { MeowOutput } from "../../bin/ts/cli";
import { buildIncludeFile } from "./buildIncludeFile";
import { SummaryItem } from "./undefinedOrSummary";

function snap(
  uuid: string,
  comment: string | null,
  input: MeowOutput,
  file: SummaryItem | undefined
): void {
  it(uuid, () => {
    /** setup mocks */

    /** unit under test */
    const includeFile = buildIncludeFile(input);
    const result = includeFile(file);

    /** assertions */
    expect({
      [`${comment ?? "TODO: comment"}`]: { result },
    }).toMatchSnapshot();
  });
}

snap(
  "5c9c07a3-5e29-45fe-af63-8780df887809",
  "undefined file doesn't throw an error WHEN includeNotTested false",
  { flags: { includeTested: false, includeNotTested: false } } as MeowOutput,
  undefined
);

snap(
  "a036467a-aa43-438a-a54a-220cbb3539fb",
  "undefined file doesn't throw an error WHEN includeNotTested true",
  { flags: { includeTested: false, includeNotTested: true } } as MeowOutput,
  undefined
);

snap(
  "5bf05b28-2df7-43a9-944b-72c65acccbb9",
  "returns `true` for file because at least 1 statement is tested",
  { flags: { includeTested: true, includeNotTested: false } } as MeowOutput,
  { statements: 2, uncoveredStatements: 1 } as SummaryItem
);

snap(
  "8d1e30e7-4f17-4fee-a36c-4da484d0e25e",
  "returns `true` for file because at least 1 conditional is tested",
  { flags: { includeTested: true, includeNotTested: false } } as MeowOutput,
  { conditionals: 2, uncoveredConditionals: 1 } as SummaryItem
);

snap(
  "13a1c1c6-dd44-4fc4-8102-da679ba19713",
  "returns `true` for file because every line and conditional is not tested",
  { flags: { includeTested: false, includeNotTested: true } } as MeowOutput,
  {
    conditionals: 9,
    uncoveredConditionals: 9,
    statements: 99,
    uncoveredStatements: 99,
  } as SummaryItem
);
