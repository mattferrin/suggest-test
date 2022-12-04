import { MeowOutput } from "../../bin/ts/cli";
import { FileArray } from "./summarizedResult";
import { Untrusted } from "./Untrusted";

export function hasUnmarkedConditional(
  input: MeowOutput,
  file: Untrusted<FileArray[number]>
): boolean {
  if (input.flags.includeConditionals) {
    const hasConditional =
      file?.metrics?.some((metric) => {
        return Number.parseInt(metric?.$?.conditionals ?? "0") > 0;
      }) ?? false;

    return (
      hasConditional &&
      (file?.line?.every((line) => {
        return line?.$?.type !== "cond";
      }) ??
        false)
    );
  } else {
    return false;
  }
}
