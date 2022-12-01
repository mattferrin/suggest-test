import { MeowOutput } from "../../bin/ts/cli";
import { FileArray, summarizedResult } from "./summarizedResult";
import { Untrusted } from "./Untrusted";
import * as weightScore from "./weightScore";

function snap(
  uuid: string,
  comment: string | null,
  input: MeowOutput,
  filteredProjectPackageFile: Untrusted<FileArray>
): void {
  it(uuid, () => {
    /** setup mocks */
    const weightScoreSpy = jest
      .spyOn(weightScore, "weightScore")
      .mockImplementation(() => "weightScore result" as any);

    /** unit under test */
    const result = summarizedResult(input, filteredProjectPackageFile);

    /** assertions */
    expect({
      [`${comment ?? "TODO: comment"}`]: {
        result,
        weightScoreCalls: weightScoreSpy.mock.calls,
      },
    }).toMatchSnapshot();
  });
}

snap(
  "c5353fde-c0eb-45b0-89f0-4a92ae9375a2",
  "`undefined` result from null array",
  "expect as 1st arg to weightScore" as any,
  null
);
snap(
  "7c65727c-f676-4f54-9ab7-60bdf07b5dc1",
  "`undefined` result from undefined array",
  "expect as 1st arg to weightScore" as any,
  undefined
);

snap(
  "b102ad95-daa6-4a7a-b2af-c2f90f31d692",
  "`[]` result from empty array",
  "expect as 1st arg to weightScore" as any,
  []
);

snap(
  "b35725b4-bf32-40fc-ad51-0005b6e67233",
  "null item doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [null]
);
snap(
  "1ab54fed-8e14-434d-9d2d-0d3d96a74c66",
  "undefined item doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [undefined]
);

snap(
  "00b89c24-10ea-4a90-8fed-84f225a31e28",
  "null item metrics doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: null }] as Untrusted<FileArray>
);
snap(
  "bd595fed-1bcf-4190-b611-903dc9caa324",
  "undefined item metrics doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: undefined }] as Untrusted<FileArray>
);

snap(
  "96868bda-df0c-4aa0-a633-1df4c9999b68",
  "null item metrics item doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: [null] }] as Untrusted<FileArray>
);
snap(
  "5a4fbb77-3ea5-4bef-8def-f2c920ab2741",
  "undefined item metrics item doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: [undefined] }] as Untrusted<FileArray>
);

snap(
  "5cbcf1dc-6f60-40b3-8d1c-53c27f36c0e4",
  "null item metrics item $ doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: [{ $: null }] }] as Untrusted<FileArray>
);
snap(
  "a8fc47ff-abaa-4690-89be-0a43eeb94905",
  "undefined item metrics item $ doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: [{ $: undefined }] }] as Untrusted<FileArray>
);

snap(
  "6eac347e-8284-4d08-81a9-0bb4dcf6530c",
  "undefined item metrics item $ propterties don't break things",
  "expect as 1st arg to weightScore" as any,
  [{ metrics: [{ $: {} }] }] as Untrusted<FileArray>
);
snap(
  "403c1ab5-54ff-4a24-8dbf-4fe1e9079161",
  "null item metrics item $ propterties don't break things",
  "expect as 1st arg to weightScore" as any,
  [
    {
      metrics: [
        {
          $: {
            statements: null,
            coveredstatements: null,
            conditionals: null,
            coveredconditionals: null,
          },
        },
      ],
    },
  ] as Untrusted<FileArray>
);

snap(
  "0f20adf1-e300-4055-a718-d44c2915d302",
  "defined item metrics item $ propterties translate properly",
  "expect as 1st arg to weightScore" as any,
  [
    {
      metrics: [
        {
          $: {
            statements: "2",
            coveredstatements: 1,
            conditionals: "6",
            coveredconditionals: 3,
          },
        },
      ],
    },
  ] as Untrusted<FileArray>
);

snap(
  "63be1e68-70b0-4ae6-ba76-8565643a2f49",
  "null item $ path doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [
    {
      $: { path: null },
    },
  ] as Untrusted<FileArray>
);
snap(
  "ff2101ee-7810-4e56-9d8d-cd511eb5e1ff",
  "undefined item $ path doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [
    {
      $: { path: undefined },
    },
  ] as Untrusted<FileArray>
);

snap(
  "4ec6aa85-35a7-4947-a21b-83a1f8fe0d2d",
  "null item $ doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [
    {
      $: null,
    },
  ] as Untrusted<FileArray>
);
snap(
  "7e2816e1-da30-4bd2-a46f-1627baacf368",
  "undefined item $ doesn't break things",
  "expect as 1st arg to weightScore" as any,
  [
    {
      $: undefined,
    },
  ] as Untrusted<FileArray>
);

snap(
  "824dc8e2-5db8-45fa-80ff-7145871c8c9c",
  "defined item $ path translates",
  "expect as 1st arg to weightScore" as any,
  [
    {
      $: { path: "expect as result item path" },
    },
  ] as Untrusted<FileArray>
);
