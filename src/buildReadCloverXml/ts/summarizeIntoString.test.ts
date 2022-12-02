import { MeowOutput } from "../../bin/ts/cli";
import { summarizeIntoString } from "./summarizeIntoString";
import { SummaryItem } from "./undefinedOrSummary";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: MeowOutput;
  summaryArray: ReadonlyArray<SummaryItem | undefined>;
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const result = summarizeIntoString(input.input, input.summaryArray);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "63ae7c30-ed68-4726-b3a6-20deb68b73bd",
  comment: "show please let 1 include be true",
  input: {
    flags: { includeConditionals: false, includeStatements: false },
  } as MeowOutput,
  summaryArray: [],
});

snap({
  stabileSortId: "4337e511-5d22-4675-8ef1-adf84cc74172",
  comment: "show no statements",
  input: {
    flags: { includeConditionals: false, includeStatements: true },
  } as MeowOutput,
  summaryArray: [],
});
snap({
  stabileSortId: "51f963fb-6201-47b5-b164-d0b8dfb9b612",
  comment: "show no conditionals",
  input: {
    flags: { includeConditionals: true, includeStatements: false },
  } as MeowOutput,
  summaryArray: [],
});
snap({
  stabileSortId: "f91efabb-ab0a-4a8a-acf2-0829970bb814",
  comment: "show no conditionals or statements",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  summaryArray: [],
});

snap({
  stabileSortId: "279dd56b-7501-46e8-a08d-a7588ac37114",
  comment: "missing path or score don't error",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  summaryArray: [{}] as SummaryItem[],
});

snap({
  stabileSortId: "41fdcfa1-e922-4d60-8d20-67395195c7e6",
  comment: "shows 1 line",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  summaryArray: [{ path: "actual/path", score: 99 } as SummaryItem],
});
snap({
  stabileSortId: "41fdcfa1-e922-4d60-8d20-67395195c7e6",
  comment: "shows 2 lines",
  input: {
    flags: { includeConditionals: true, includeStatements: true },
  } as MeowOutput,
  summaryArray: [
    { path: "actual/path", score: 99 },
    { path: "actual/path/1", score: 999 },
  ] as SummaryItem[],
});
