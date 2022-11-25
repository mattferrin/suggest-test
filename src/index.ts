import { buildReadCloverXml } from "./parse-clover-xml/ts/readCloverXml";

// eslint-disable-next-line functional/no-expression-statement
const suggestExistingBalance = buildReadCloverXml({ tag: "existing-balance" });

// eslint-disable-next-line functional/no-expression-statement
void suggestExistingBalance()
  // eslint-disable-next-line functional/no-return-void
  .then((newLines) => {
    return console.log(JSON.stringify({ newLines }, null, 2));
  });
