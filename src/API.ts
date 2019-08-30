/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateSlotStatusInput = {
  Device: number,
  SlotStatus: number,
};

export type StartParkingInput = {
  UserID: string,
  PlateNumber: string,
  SlotNumber: string,
};

export type FinishParkingInput = {
  UserID: string,
  InvoiceID: string,
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

export type StartParkingMutationVariables = {
  input: StartParkingInput,
};

export type StartParkingMutation = {
  startParking:  {
    __typename: "Invoice",
    Id: string,
    UserID: string | null,
    SlotID: string | null,
    PlateNumber: string | null,
    DateFrom: string | null,
    DateTo: string | null,
    Price: number | null,
  } | null,
};

export type FinishParkingMutationVariables = {
  input: FinishParkingInput,
};

export type FinishParkingMutation = {
  finishParking:  {
    __typename: "Invoice",
    Id: string,
    UserID: string | null,
    SlotID: string | null,
    PlateNumber: string | null,
    DateFrom: string | null,
    DateTo: string | null,
    Price: number | null,
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

export type ListInvoicesQuery = {
  listInvoices:  Array< {
    __typename: "Invoice",
    Id: string,
    UserID: string | null,
    SlotID: string | null,
    PlateNumber: string | null,
    DateFrom: string | null,
    DateTo: string | null,
    Price: number | null,
  } | null > | null,
};

export type ListParkingInfoQuery = {
  listParkingInfo:  Array< {
    __typename: "ParkingInfo",
    ID: string,
    Title: string | null,
    Rate: number | null,
    Address:  {
      __typename: "Address",
      City: string | null,
      CountryCode: string | null,
      Line1: string | null,
      PostalCode: string | null,
      State: string | null,
    } | null,
    Location:  {
      __typename: "Location",
      Latitude: number | null,
      Longitude: number | null,
    } | null,
    Features: Array< string | null > | null,
    OpeningHours: string | null,
  } | null > | null,
};

export type GetParkingInfoQueryVariables = {
  ID: string,
};

export type GetParkingInfoQuery = {
  getParkingInfo:  {
    __typename: "ParkingInfo",
    ID: string,
    Title: string | null,
    Rate: number | null,
    Address:  {
      __typename: "Address",
      City: string | null,
      CountryCode: string | null,
      Line1: string | null,
      PostalCode: string | null,
      State: string | null,
    } | null,
    Location:  {
      __typename: "Location",
      Latitude: number | null,
      Longitude: number | null,
    } | null,
    Features: Array< string | null > | null,
    OpeningHours: string | null,
  } | null,
};

export type OnUpdateSlotStatusSubscription = {
  onUpdateSlotStatus:  {
    __typename: "Slot",
    Id: string,
    Device: number | null,
    SlotNumber: string | null,
    SlotStatus: number | null,
  } | null,
};

export type OnStartParkingSubscription = {
  onStartParking:  {
    __typename: "Invoice",
    Id: string,
    UserID: string | null,
    SlotID: string | null,
    PlateNumber: string | null,
    DateFrom: string | null,
    DateTo: string | null,
    Price: number | null,
  } | null,
};

export type OnFinishParkingSubscription = {
  onFinishParking:  {
    __typename: "Invoice",
    Id: string,
    UserID: string | null,
    SlotID: string | null,
    PlateNumber: string | null,
    DateFrom: string | null,
    DateTo: string | null,
    Price: number | null,
  } | null,
};
