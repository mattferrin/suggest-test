import { MeowOutput } from "../../bin/ts/cli";

export function weightScore(
  input: MeowOutput,
  statements: number,
  uncoveredStatements: number,
  conditionals: number,
  uncoveredConditionals: number
): number {
  const weightedStatements =
    statements === 0 ? 0 : Math.pow(uncoveredStatements, 1.3) / statements;
  const weightedConditionals =
    conditionals === 0
      ? 0
      : Math.pow(uncoveredConditionals, 1.3) / conditionals;

  const weightedBalance = weightedStatements + weightedConditionals;

  if (!input.flags.includeConditionals) {
    return weightedStatements;
  } else if (!input.flags.includeStatements) {
    return weightedConditionals;
  } else {
    return weightedBalance;
  }
}
