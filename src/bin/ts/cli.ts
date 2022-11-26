#!/usr/bin/env node

/* eslint-disable functional/no-expression-statement */

import meow from "meow";
import { buildReadCloverXml } from "../../buildReadCloverXml/ts/buildReadCloverXml";

export interface MeowOutput {
  readonly flags: {
    readonly includeNotTested: boolean;
    readonly includeTested: boolean;
    readonly includeStatements: boolean;
    readonly includeConditionals: boolean;
  };
}

const meowOutput: MeowOutput = meow(`help`, {
  flags: {
    includeNotTested: {
      type: "boolean",
      alias: "nt",
      isRequired: false,
      default: true,
    },
    includeTested: {
      type: "boolean",
      alias: "t",
      isRequired: false,
      default: true,
    },
    includeStatements: {
      type: "boolean",
      alias: "s",
      isRequired: false,
      default: true,
    },
    includeConditionals: {
      type: "boolean",
      alias: "c",
      isRequired: false,
      default: true,
    },
  },
});

void buildReadCloverXml(meowOutput)();
