import { undefinedOrSummary } from "./undefinedOrSummary";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  summary: Parameters<typeof undefinedOrSummary>[0];
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const result = undefinedOrSummary(input.summary);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "4e1c9e6f-a5ef-48c7-abcd-040d76113c79",
  comment: "clover file has undefined or null",
  summary: undefined,
});

snap({
  stabileSortId: "86a79ca4-df17-45fb-8d9f-cba3802eb3b8",
  comment: "summary array defined AND summary string not computed yet",
  summary: "summary arg" as any,
});
