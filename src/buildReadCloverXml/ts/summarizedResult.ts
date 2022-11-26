import { SummaryItem } from "./undefinedOrSummary";
import { Untrusted } from "./Untrusted";

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
    const uncoveredStatements =
      (projectPackageFile?.metrics?.[0]?.$?.statements ?? 0) -
      (projectPackageFile?.metrics?.[0]?.$?.coveredstatements ?? 0);
    const statements = projectPackageFile?.metrics?.[0]?.$?.statements ?? 0;

    const uncoveredConditionals =
      (projectPackageFile?.metrics?.[0]?.$?.conditionals ?? 0) -
      (projectPackageFile?.metrics?.[0]?.$?.coveredConditionals ?? 0);
    const conditionals = projectPackageFile?.metrics?.[0]?.$?.conditionals ?? 0;

    return {
      conditionals,
      path: projectPackageFile?.$?.path,
      statements,
      uncoveredConditionals,
      uncoveredStatements,
      weightedConditionals:
        conditionals === 0
          ? 0
          : Math.pow(uncoveredConditionals, 1.3) / conditionals,
      weightedStatements:
        statements === 0 ? 0 : Math.pow(uncoveredStatements, 1.3) / statements,
    };
  });
}
