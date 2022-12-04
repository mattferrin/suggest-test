import { hasUnmarkedConditional } from "./hasUnmarkedConditional";

type Input = Parameters<typeof hasUnmarkedConditional>[0];
type ProjectPackage = Parameters<typeof hasUnmarkedConditional>[1];

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: Input;
  file: ProjectPackage;
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const result = hasUnmarkedConditional(input.input, input.file);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "f823b49a-cfdd-40c9-8dac-5f7a9975d0c6",
  comment:
    "`true` WHEN conditional exists AND NO line data AND conditionals included",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [{ $: { conditionals: "1" } }],
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});
snap({
  stabileSortId: "424ba948-963c-46d0-b32b-07ade51c9f31",
  comment:
    "`false` WHEN conditional exists AND NO line data AND conditionals excuded",
  input: { flags: { includeConditionals: false } } as Input,
  file: {
    metrics: [{ $: { conditionals: "1" } }],
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});

snap({
  stabileSortId: "e9609fe2-44db-47b5-91d3-27831468a361",
  comment: "`false` WHEN NO conditionals",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [{ $: { conditionals: "0" } }],
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});

snap({
  stabileSortId: "b2f223ca-cd12-4ce6-b5cb-dc0c62642a17",
  comment:
    "`false` WHEN conditional line data exists AND conditionals included",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [{ $: { conditionals: "1" } }],
    line: [{ $: { type: "cond" as any } }],
  } as ProjectPackage,
});

snap({
  stabileSortId: "ca766aa2-a8c8-4b12-9700-b1b771ae11c7",
  comment: "`false` WHEN null input",
  input: { flags: { includeConditionals: true } } as Input,
  file: null,
});
snap({
  stabileSortId: "e5a1d9b8-4a9d-4776-98e8-6c11ee37095c",
  comment: "`false` WHEN undefined input",
  input: { flags: { includeConditionals: true } } as Input,
  file: undefined,
});

snap({
  stabileSortId: "7fcd5863-dde8-4427-a2d7-c21195086170",
  comment:
    "`false` WHEN NO line data AND conditionals included AND undefined metrics item",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [undefined],
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});
snap({
  stabileSortId: "e18a4ddd-68e4-4bb2-ba82-622bd574d66b",
  comment:
    "`false` WHEN NO line data AND conditionals included AND null metrics item",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [null],
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});

snap({
  stabileSortId: "06c24ded-fd1e-44e7-aca5-323622f883ca",
  comment:
    "`false` WHEN NO line data AND conditionals included AND undefined metrics",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: undefined,
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});
snap({
  stabileSortId: "aff17e98-44c1-456f-b06e-e78f221a13d9",
  comment:
    "`false` WHEN NO line data AND conditionals included AND null metrics",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: null,
    line: [{ $: { type: "NOT cond" as any } }],
  } as ProjectPackage,
});

snap({
  stabileSortId: "f823b49a-cfdd-40c9-8dac-5f7a9975d0c6",
  comment: "result `false` WHEN line undefined",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [{ $: { conditionals: "1" } }],
    line: undefined,
  } as ProjectPackage,
});
snap({
  stabileSortId: "f823b49a-cfdd-40c9-8dac-5f7a9975d0c6",
  comment: "result `false` WHEN line null",
  input: { flags: { includeConditionals: true } } as Input,
  file: {
    metrics: [{ $: { conditionals: "1" } }],
    line: null,
  } as ProjectPackage,
});
