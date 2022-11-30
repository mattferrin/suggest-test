import { MeowOutput } from "../../bin/ts/cli";
import { buildIncludeKind } from "./buildIncludeKind";
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
    const includeKind = buildIncludeKind(input);
    const result = includeKind(file);

    /** assertions */
    expect({
      [`${comment ?? "TODO: comment"}`]: { result },
    }).toMatchSnapshot();
  });
}

snap(
  "f2c0498a-c3cc-4a41-80fd-f588e0a99235",
  "returns `false` to exclude undefined file item WHEN includeConditionals false",
  { flags: { includeConditionals: false } } as MeowOutput,
  undefined
);

snap(
  "528059d4-1a4b-4cab-af69-c7ab0418506c",
  "returns `false` to exclude undefined file item WHEN includeStatements false",
  {
    flags: { includeStatements: false },
  } as MeowOutput,
  undefined
);

snap(
  "5c8f57e5-9bec-4908-94bb-0e4d5cd19981",
  "returns `false` to exclude undefined file item WHEN both includeConditionals AND includeStatements true",
  {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  undefined
);

snap(
  "7cf788e5-cee9-44f7-baa0-1af2e17de2ab",
  "returns `true` to include item WHEN 1 uncovered statement AND conditionals excluded",
  {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  { statements: 1, uncoveredStatements: 1 } as SummaryItem
);

snap(
  "17dc0f2d-3ca0-43c5-87b7-1d2aa236dee9",
  "returns `true` to include item WHEN 1 uncovered conditional AND statements excluded",
  {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  { conditionals: 1, uncoveredConditionals: 1 } as SummaryItem
);

snap(
  "e4177bfa-d1a6-4953-a625-144726b42906",
  "returns `true` to include item WHEN 1 uncovered statement AND all included",
  {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  { statements: 1, uncoveredStatements: 1 } as SummaryItem
);

snap(
  "2139f6fd-719c-424d-b4b2-bfbb2053c497",
  "returns `true` to include item WHEN 1 uncovered conditional AND all included",
  {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  { conditionals: 1, uncoveredConditionals: 1 } as SummaryItem
);

snap(
  "cad6ea7f-4248-433d-989b-0f7c6d403e25",
  "returns `false` to exclude item WHEN 0 statements AND conditionals excluded",
  {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  { statements: 0, uncoveredStatements: 1 } as SummaryItem
);

snap(
  "71b9c9f8-d795-4234-87ca-a2da7ddf7489",
  "returns `false` to exclude item WHEN 0 conditionals AND statements excluded",
  {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  { conditionals: 0, uncoveredConditionals: 1 } as SummaryItem
);

snap(
  "4bf9a8fc-eaa4-412f-a7ac-81fc4d82b3c2",
  "returns `false` to exclude item WHEN 0 conditionals AND 0 statements AND all included",
  {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  {
    conditionals: 0,
    uncoveredConditionals: 1,
    statements: 0,
    uncoveredStatements: 1,
  } as SummaryItem
);

snap(
  "cfe960a0-28f2-42d4-ac23-e303109a30b4",
  "returns `false` to exclude item WHEN 1 statement that is covered AND conditionals excluded",
  {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  { statements: 1, uncoveredStatements: 0 } as SummaryItem
);

snap(
  "07e7baf7-9408-4254-af30-a7c724b4b7ad",
  "returns `false` to exclude item WHEN 1 conditional that is covered AND statements excluded",
  {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  { conditionals: 1, uncoveredConditionals: 0 } as SummaryItem
);

snap(
  "96dc42c6-bade-45fb-aa2c-57d9baf3367c",
  "returns `false` to exclude item WHEN 1 conditional that is covered AND 1 statement that is covered AND all included",
  {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  {
    conditionals: 1,
    uncoveredConditionals: 0,
    statements: 1,
    uncoveredStatements: 0,
  } as SummaryItem
);
