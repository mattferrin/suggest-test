import { filterFileByLineType } from "./filterFileByLineType";
import { FileArray } from "./summarizedResult";
import { Untrusted } from "./Untrusted";

type Input = Parameters<typeof filterFileByLineType>[0];

function snap(input: {
  stabileSortId: string;
  comment: string | null;
  input: Input;
  projectPackage: Parameters<typeof filterFileByLineType>[1];
}): void {
  it(input.stabileSortId, () => {
    /** setup mocks */

    /** unit under test */
    const result = filterFileByLineType(input.input, input.projectPackage);

    /** assertions */
    expect({
      [`${input.comment ?? "TODO: comment"}`]: {
        result,
      },
    }).toMatchSnapshot();
  });
}

snap({
  stabileSortId: "fa22c1bd-307c-4ab7-a396-c312ed3cd567",
  comment:
    "`undefined` result because undefined projectPackage has no file WHEN statements included",
  input: { flags: { includeStatements: true } } as Input,
  projectPackage: undefined,
});
snap({
  stabileSortId: "4162262a-50c4-4f2a-a25a-30ac9880c4c2",
  comment:
    "`undefined` result because null projectPackage has no file WHEN statements included",
  input: { flags: { includeStatements: true } } as Input,
  projectPackage: null,
});
snap({
  stabileSortId: "4598d4d8-11f4-464e-a0c4-f2277d2b6318",
  comment:
    "`projectPackage arg file prop` result because file defined WHEN statements included",
  input: { flags: { includeStatements: true } } as Input,
  projectPackage: { file: "projectPackage arg file prop" as any },
});

snap({
  stabileSortId: "7485ae3a-2133-470f-bb52-afd80b6167d0",
  comment:
    "`undefined` result because undefined projectPackage WHEN statements excluded",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: undefined,
});
snap({
  stabileSortId: "2cd2e1e1-00e4-4ec8-a255-73aa1c778846",
  comment:
    "`undefined` result because null projectPackage WHEN statements excluded",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: null,
});

snap({
  stabileSortId: "97775dd4-7c63-45e2-904d-f1988ee098c7",
  comment:
    "`undefined` result because undefined projectPackage file WHEN statements excluded",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: undefined },
});
snap({
  stabileSortId: "044bbd18-d569-4d8f-98af-312f20fe84dd",
  comment:
    "`undefined` result because null projectPackage file WHEN statements excluded",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: null },
});

snap({
  stabileSortId: "0b619f9c-cccf-4d54-a6ac-00d0f92d8d13",
  comment: "`[]` result because file empty AND statements excluded",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [] },
});

snap({
  stabileSortId: "6cc23ee9-8cb5-4bbe-ad01-6153a2fbe6be",
  comment: "`[]` result WHEN item undefined AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [undefined] },
});
snap({
  stabileSortId: "9d1c1d27-94a7-4b79-9108-93af2e34d88f",
  comment: "`[]` result WHEN item null AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [null] },
});

snap({
  stabileSortId: "e2152348-6515-4ebb-b1f9-f7aec06b58f9",
  comment: "`[]` result WHEN item line undefined AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [{ line: undefined }] as Untrusted<FileArray> },
});
snap({
  stabileSortId: "7951520c-b8d6-4015-892b-73186c449e1c",
  comment: "`[]` result WHEN item line null AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [{ line: null }] as Untrusted<FileArray> },
});

snap({
  stabileSortId: "d7c4b5f0-d1ae-4443-986c-83d7dcaf82ee",
  comment: "`[]` result WHEN item line item undefined AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [{ line: [undefined] }] as Untrusted<FileArray> },
});
snap({
  stabileSortId: "01b5eabe-78e0-4dec-8b60-915f5c5fbef6",
  comment: "`[]` result WHEN item line item null AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [{ line: [null] }] as Untrusted<FileArray> },
});

snap({
  stabileSortId: "cd44ae3c-07f7-4a18-a1d2-3bbec8c78fa7",
  comment:
    "`[]` result WHEN item line item $ undefined AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: {
    file: [{ line: [{ $: undefined }] }] as Untrusted<FileArray>,
  },
});
snap({
  stabileSortId: "c700bcf2-e1ff-461d-ae79-e404515dcfc6",
  comment: "`[]` result WHEN item line item $ null AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: { file: [{ line: [{ $: null }] }] as Untrusted<FileArray> },
});

snap({
  stabileSortId: "2e2f7fc5-15ed-438e-abe6-2acfcff9815d",
  comment:
    "`[]` result WHEN item line item $ type IS NOT cond AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: {
    file: [
      { line: [{ $: { type: "NOT cond" as any } }] },
    ] as Untrusted<FileArray>,
  },
});
snap({
  stabileSortId: "e16ee10b-f2fe-4ca2-b968-0f093a669cd9",
  comment:
    "result includes conditionals WHEN item line item $ type IS cond AND statements included",
  input: { flags: { includeStatements: false } } as Input,
  projectPackage: {
    file: [{ line: [{ $: { type: "cond" } }] }] as Untrusted<FileArray>,
  },
});
