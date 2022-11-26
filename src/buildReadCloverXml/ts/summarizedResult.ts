import { MeowOutput } from "../../bin/ts/cli";
import { SummaryItem } from "./undefinedOrSummary";
import { Untrusted } from "./Untrusted";
import { weightScore } from "./weightScore";

export type FileArray = ReadonlyArray<{
  readonly $: { readonly path: string };
  readonly metrics: ReadonlyArray<{
    readonly $: {
      readonly statements: string;
      readonly coveredstatements: number;
      readonly conditionals: string;
      readonly coveredconditionals: number;
    };
  }>;
  readonly line: ReadonlyArray<{
    readonly $: { readonly type: "cond" };
  }>;
}>;

export function summarizedResult(
  input: MeowOutput,
  filteredProjectPackageFile: Untrusted<FileArray>
): ReadonlyArray<SummaryItem | undefined> | undefined {
  return filteredProjectPackageFile?.flatMap((projectPackageFile) => {
    const statements = Number.parseInt(
      projectPackageFile?.metrics?.[0]?.$?.statements ?? "0"
    );
    const uncoveredStatements =
      (statements ?? 0) -
      (projectPackageFile?.metrics?.[0]?.$?.coveredstatements ?? 0);

    const conditionals = Number.parseInt(
      projectPackageFile?.metrics?.[0]?.$?.conditionals ?? "0"
    );
    const uncoveredConditionals =
      (conditionals ?? 0) -
      (projectPackageFile?.metrics?.[0]?.$?.coveredconditionals ?? 0);

    return {
      conditionals,
      path: projectPackageFile?.$?.path,
      score: weightScore(
        input,
        statements,
        uncoveredStatements,
        conditionals,
        uncoveredConditionals
      ),
      statements,
      uncoveredConditionals,
      uncoveredStatements,
    };
  });
}
