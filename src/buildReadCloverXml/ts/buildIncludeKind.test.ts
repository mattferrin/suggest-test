import { MeowOutput } from "../../bin/ts/cli";
import { buildIncludeKind } from "./buildIncludeKind";
import { SummaryItem } from "./undefinedOrSummary";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: Parameters<typeof buildIncludeKind>[0];
  file: Parameters<ReturnType<typeof buildIncludeKind>>[0];
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const includeKind = buildIncludeKind(input.input);
    const result = includeKind(input.file);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: { result },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "f2c0498a-c3cc-4a41-80fd-f588e0a99235",
  comment:
    "returns `false` to exclude undefined file item WHEN includeConditionals false",
  input: { flags: { includeConditionals: false } } as MeowOutput,
  file: undefined,
});

snap({
  stabileSortId: "528059d4-1a4b-4cab-af69-c7ab0418506c",
  comment:
    "returns `false` to exclude undefined file item WHEN includeStatements false",
  input: {
    flags: { includeStatements: false },
  } as MeowOutput,
  file: undefined,
});

snap({
  stabileSortId: "5c8f57e5-9bec-4908-94bb-0e4d5cd19981",
  comment:
    "returns `false` to exclude undefined file item WHEN both includeConditionals AND includeStatements true",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  file: undefined,
});

snap({
  stabileSortId: "7cf788e5-cee9-44f7-baa0-1af2e17de2ab",
  comment:
    "returns `true` to include item WHEN 1 uncovered statement AND conditionals excluded",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  file: { statements: 1, uncoveredStatements: 1 } as SummaryItem,
});

snap({
  stabileSortId: "17dc0f2d-3ca0-43c5-87b7-1d2aa236dee9",
  comment:
    "returns `true` to include item WHEN 1 uncovered conditional AND statements excluded",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  file: { conditionals: 1, uncoveredConditionals: 1 } as SummaryItem,
});

snap({
  stabileSortId: "e4177bfa-d1a6-4953-a625-144726b42906",
  comment:
    "returns `true` to include item WHEN 1 uncovered statement AND all included",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  file: { statements: 1, uncoveredStatements: 1 } as SummaryItem,
});

snap({
  stabileSortId: "2139f6fd-719c-424d-b4b2-bfbb2053c497",
  comment:
    "returns `true` to include item WHEN 1 uncovered conditional AND all included",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  file: { conditionals: 1, uncoveredConditionals: 1 } as SummaryItem,
});

snap({
  stabileSortId: "cad6ea7f-4248-433d-989b-0f7c6d403e25",
  comment:
    "returns `false` to exclude item WHEN 0 statements AND conditionals excluded",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  file: { statements: 0, uncoveredStatements: 1 } as SummaryItem,
});

snap({
  stabileSortId: "71b9c9f8-d795-4234-87ca-a2da7ddf7489",
  comment:
    "returns `false` to exclude item WHEN 0 conditionals AND statements excluded",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  file: { conditionals: 0, uncoveredConditionals: 1 } as SummaryItem,
});

snap({
  stabileSortId: "4bf9a8fc-eaa4-412f-a7ac-81fc4d82b3c2",
  comment:
    "returns `false` to exclude item WHEN 0 conditionals AND 0 statements AND all included",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  file: {
    conditionals: 0,
    uncoveredConditionals: 1,
    statements: 0,
    uncoveredStatements: 1,
  } as SummaryItem,
});

snap({
  stabileSortId: "cfe960a0-28f2-42d4-ac23-e303109a30b4",
  comment:
    "returns `false` to exclude item WHEN 1 statement that is covered AND conditionals excluded",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  file: { statements: 1, uncoveredStatements: 0 } as SummaryItem,
});

snap({
  stabileSortId: "07e7baf7-9408-4254-af30-a7c724b4b7ad",
  comment:
    "returns `false` to exclude item WHEN 1 conditional that is covered AND statements excluded",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  file: { conditionals: 1, uncoveredConditionals: 0 } as SummaryItem,
});

snap({
  stabileSortId: "96dc42c6-bade-45fb-aa2c-57d9baf3367c",
  comment:
    "returns `false` to exclude item WHEN 1 conditional that is covered AND 1 statement that is covered AND all included",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  file: {
    conditionals: 1,
    uncoveredConditionals: 0,
    statements: 1,
    uncoveredStatements: 0,
  } as SummaryItem,
});
