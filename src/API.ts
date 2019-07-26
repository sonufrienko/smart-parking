/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateSlotStatusInput = {
  Device: number,
  SlotStatus: number,
};

export type UpdateSlotStatusMutationVariables = {
  input: UpdateSlotStatusInput,
};

export type UpdateSlotStatusMutation = {
  updateSlotStatus:  {
    __typename: "Slot",
    Id: string,
    Device: number | null,
    SlotNumber: string | null,
    SlotStatus: number | null,
  } | null,
};

export type ListSlotsQuery = {
  listSlots:  Array< {
    __typename: "Slot",
    Id: string,
    Device: number | null,
    SlotNumber: string | null,
    SlotStatus: number | null,
  } | null > | null,
};
