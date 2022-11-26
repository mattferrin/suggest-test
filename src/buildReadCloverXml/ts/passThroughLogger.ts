/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */

import { ReadCloverXmlOutput } from "./buildReadCloverXml";

export function passThroughLogger(
  summary: ReadCloverXmlOutput
): ReadCloverXmlOutput {
  switch (summary.tag) {
    case "errors":
      summary.errors.forEach((error) => {
        console.error(error);
      });
      break;
    case "summary":
      console.log(summary.summaryString);
      break;
  }

  return summary;
}
