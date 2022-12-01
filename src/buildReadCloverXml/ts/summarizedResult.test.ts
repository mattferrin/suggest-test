import { MeowOutput } from "../../bin/ts/cli";
import { FileArray, summarizedResult } from "./summarizedResult";
import { Untrusted } from "./Untrusted";
import * as weightScore from "./weightScore";

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: MeowOutput;
  filteredProjectPackageFile: Untrusted<FileArray>;
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */
    const weightScoreSpy = jest
      .spyOn(weightScore, "weightScore")
      .mockImplementation(() => "weightScore result" as any);

    /** unit under test */
    const result = summarizedResult(
      input.input,
      input.filteredProjectPackageFile
    );

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
        weightScoreCalls: weightScoreSpy.mock.calls,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "c5353fde-c0eb-45b0-89f0-4a92ae9375a2",
  comment: "`undefined` result from null array",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: null,
});
snap({
  stabileSortId: "7c65727c-f676-4f54-9ab7-60bdf07b5dc1",
  comment: "`undefined` result from undefined array",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: undefined,
});

snap({
  stabileSortId: "b102ad95-daa6-4a7a-b2af-c2f90f31d692",
  comment: "`[]` result from empty array",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [],
});

snap({
  stabileSortId: "b35725b4-bf32-40fc-ad51-0005b6e67233",
  comment: "null item doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [null],
});
snap({
  stabileSortId: "1ab54fed-8e14-434d-9d2d-0d3d96a74c66",
  comment: "undefined item doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [undefined],
});

snap({
  stabileSortId: "00b89c24-10ea-4a90-8fed-84f225a31e28",
  comment: "null item metrics doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [{ metrics: null }] as Untrusted<FileArray>,
});
snap({
  stabileSortId: "bd595fed-1bcf-4190-b611-903dc9caa324",
  comment: "undefined item metrics doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [{ metrics: undefined }] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "96868bda-df0c-4aa0-a633-1df4c9999b68",
  comment: "null item metrics item doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [{ metrics: [null] }] as Untrusted<FileArray>,
});
snap({
  stabileSortId: "5a4fbb77-3ea5-4bef-8def-f2c920ab2741",
  comment: "undefined item metrics item doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    { metrics: [undefined] },
  ] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "5cbcf1dc-6f60-40b3-8d1c-53c27f36c0e4",
  comment: "null item metrics item $ doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    { metrics: [{ $: null }] },
  ] as Untrusted<FileArray>,
});
snap({
  stabileSortId: "a8fc47ff-abaa-4690-89be-0a43eeb94905",
  comment: "undefined item metrics item $ doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    { metrics: [{ $: undefined }] },
  ] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "6eac347e-8284-4d08-81a9-0bb4dcf6530c",
  comment: "undefined item metrics item $ propterties don't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    { metrics: [{ $: {} }] },
  ] as Untrusted<FileArray>,
});
snap({
  stabileSortId: "403c1ab5-54ff-4a24-8dbf-4fe1e9079161",
  comment: "null item metrics item $ propterties don't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
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
  ] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "0f20adf1-e300-4055-a718-d44c2915d302",
  comment: "defined item metrics item $ propterties translate properly",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
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
  ] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "63be1e68-70b0-4ae6-ba76-8565643a2f49",
  comment: "null item $ path doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    {
      $: { path: null },
    },
  ] as Untrusted<FileArray>,
});
snap({
  stabileSortId: "ff2101ee-7810-4e56-9d8d-cd511eb5e1ff",
  comment: "undefined item $ path doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    {
      $: { path: undefined },
    },
  ] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "4ec6aa85-35a7-4947-a21b-83a1f8fe0d2d",
  comment: "null item $ doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    {
      $: null,
    },
  ] as Untrusted<FileArray>,
});
snap({
  stabileSortId: "7e2816e1-da30-4bd2-a46f-1627baacf368",
  comment: "undefined item $ doesn't break things",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    {
      $: undefined,
    },
  ] as Untrusted<FileArray>,
});

snap({
  stabileSortId: "824dc8e2-5db8-45fa-80ff-7145871c8c9c",
  comment: "defined item $ path translates",
  input: "expect as 1st arg to weightScore" as any,
  filteredProjectPackageFile: [
    {
      $: { path: "expect as result item path" },
    },
  ] as Untrusted<FileArray>,
});
