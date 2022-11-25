import { Untrusted } from "../../other/ts/Untrusted";
import { SummaryItem } from "./undefinedOrSummary";

export type FileArray = ReadonlyArray<{
  readonly $: { readonly path: string };
  readonly metrics: ReadonlyArray<{
    readonly $: {
      readonly statements: number;
      readonly coveredstatements: number;
      readonly conditionals: number;
      readonly coveredConditionals: number;
    };
  }>;
  readonly line: ReadonlyArray<{
    readonly $: { readonly type: "cond" };
  }>;
}>;

export function summarizedResult(
  filteredProjectPackageFile: Untrusted<FileArray>
): ReadonlyArray<SummaryItem | undefined> | undefined {
  return filteredProjectPackageFile?.flatMap((projectPackageFile) => {
    return {
      conditionals: projectPackageFile?.metrics?.[0]?.$?.conditionals,
      path: projectPackageFile?.$?.path,
      statements: projectPackageFile?.metrics?.[0]?.$?.statements,
      uncoveredConditionals:
        (projectPackageFile?.metrics?.[0]?.$?.conditionals ?? 0) -
        (projectPackageFile?.metrics?.[0]?.$?.coveredConditionals ?? 0),
      uncoveredStatements:
        (projectPackageFile?.metrics?.[0]?.$?.statements ?? 0) -
        (projectPackageFile?.metrics?.[0]?.$?.coveredstatements ?? 0),
    };
  });
}
