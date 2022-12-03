import { ReadCloverXmlOutput } from "./buildReadCloverXml";
import { passThroughLogger } from "./passThroughLogger";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  summary: Parameters<typeof passThroughLogger>[0];
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */
    const logSpy = jest.spyOn(global.console, "log");
    const errorSpy = jest.spyOn(global.console, "error");

    /** unit under test */
    const result = passThroughLogger(input.summary);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
        logCalls: logSpy.mock.calls,
        errorCalls: errorSpy.mock.calls,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "88d0259d-4eb5-4296-bd56-ccf7de479f59",
  comment: "displays errors in console AND passes summary result through",
  summary: {
    tag: "errors",
    errors: [new Error("expect this as console error")],
  },
});

snap({
  stabileSortId: "34693bef-26e9-403d-b4f6-038ebb5a02c4",
  comment: "displays summary in console AND passes summary result through",
  summary: {
    tag: "summary",
    summaryString: "expect this summary console log",
  } as ReadCloverXmlOutput,
});
