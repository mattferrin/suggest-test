#!/usr/bin/env node

/* eslint-disable functional/no-expression-statement */

import meow from "meow";
import { buildReadCloverXml } from "../../buildReadCloverXml/ts/buildReadCloverXml";

export interface MeowOutput {
  readonly input: readonly string[];
  readonly flags: {
    readonly includeNotTested: boolean;
    readonly includeTested: boolean;
    readonly includeStatements: boolean;
    readonly includeConditionals: boolean;
    readonly maxItems: number;
  };
}

const meowOptions = {
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
    maxItems: {
      type: "number",
      alias: "m",
      isRequired: false,
      default: 16,
    },
  },
} as const;

const flagsHelp = Object.entries(meowOptions.flags)
  .map(([key, value]) => {
    return `
  flag      --${key}
  alias     -${value.alias}
  type      ${value.type}
  default   ${String(value.default)}`;
  })
  .join("\n");

const help = `
Example:

  suggest-test coverage/clover.xml --includeTested=false --includeStatements=false

    (uses flags to suggest fully untested files with uncovered conditionals)


Flags:
${flagsHelp}
`;

const meowOutput: MeowOutput = meow(help, meowOptions);

void buildReadCloverXml(meowOutput)();
