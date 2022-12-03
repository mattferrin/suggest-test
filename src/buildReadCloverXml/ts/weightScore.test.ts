import { MeowOutput } from "../../bin/ts/cli";
import { weightScore } from "./weightScore";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: MeowOutput;
  statements: number;
  uncoveredStatements: number;
  conditionals: number;
  uncoveredConditionals: number;
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const result = weightScore(
      input.input,
      input.statements,
      input.uncoveredStatements,
      input.conditionals,
      input.uncoveredConditionals
    );

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "769978f9-3ae3-4966-a706-5f484d05d1d6",
  comment: "returns 0 because 0 statements AND conditionals excluded",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  statements: 0,
  uncoveredStatements: "not relevant" as any,
  conditionals: "not relevant" as any,
  uncoveredConditionals: "not relevant" as any,
});
snap({
  stabileSortId: "d154d99f-e253-4da7-9537-788e48182353",
  comment: "returns 0 because 0 conditionals AND statements excluded",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  statements: "not relevant" as any,
  uncoveredStatements: "not relevant" as any,
  conditionals: 0,
  uncoveredConditionals: "not relevant" as any,
});
snap({
  stabileSortId: "ab67bf36-4b32-4967-b7cb-3916181f1b68",
  comment: "returns 0 because 0 conditionals AND 0 statements",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  statements: 0 as any,
  uncoveredStatements: "not relevant" as any,
  conditionals: 0,
  uncoveredConditionals: "not relevant" as any,
});

snap({
  stabileSortId: "06842b19-a657-41b6-9214-3d9b94c387e4",
  comment: "returns 1 for 1 uncovered statement WHEN conditionals excluded",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  statements: 1,
  uncoveredStatements: 1,
  conditionals: 2,
  uncoveredConditionals: 2,
});
snap({
  stabileSortId: "3b34bd76-56d9-4a28-9163-246a31cf7d95",
  comment: "returns 1 for 1 uncovered conditional WHEN statements excluded",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  statements: 2,
  uncoveredStatements: 2,
  conditionals: 1,
  uncoveredConditionals: 1,
});
snap({
  stabileSortId: "e226e9dd-2bce-46f2-8489-d68635fdb4d4",
  comment: "returns 2 for 1 uncovered statement AND 1 uncovered conditional",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  statements: 1,
  uncoveredStatements: 1,
  conditionals: 1,
  uncoveredConditionals: 1,
});

snap({
  stabileSortId: "aa1fb537-79aa-4c10-940c-9c2628786224",
  comment:
    "returns about 0.82 WHEN 2 of 3 statements uncovered AND conditionals excluded",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  statements: 3,
  uncoveredStatements: 2,
  conditionals: 9,
  uncoveredConditionals: 9,
});
snap({
  stabileSortId: "7532b751-b93a-4cf4-92ec-c39f771020a1",
  comment:
    "returns about 0.82 WHEN 2 of 3 conditionals uncovered AND statements excluded",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  statements: 9,
  uncoveredStatements: 9,
  conditionals: 3,
  uncoveredConditionals: 2,
});
snap({
  stabileSortId: "5868e17d-d3b8-4ab1-a1b0-473084a53758",
  comment:
    "returns about 1.64 WHEN conditionals AND statements are 2 of 3 uncovered",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  statements: 3,
  uncoveredStatements: 2,
  conditionals: 3,
  uncoveredConditionals: 2,
});
