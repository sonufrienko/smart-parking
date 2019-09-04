/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateSlotStatusInput = {
  parkingID: string,
  device: number,
  slotStatus: number,
};

export type ParkingFilterInput = {
  parkingID?: string | null,
};

export type UpdateSlotMutationVariables = {
  input: UpdateSlotStatusInput,
};

export type UpdateSlotMutation = {
  updateSlot:  {
    __typename: "Slot",
    parkingID: string | null,
    slotNumber: string | null,
    slotStatus: number | null,
    device: number | null,
  } | null,
};

export type ParkingQueryVariables = {
  filter?: ParkingFilterInput | null,
};

export type ParkingQuery = {
  parking:  Array< {
    __typename: "Parking",
    parkingID: string,
    address:  {
      __typename: "Address",
      city: string | null,
      countryCode: string | null,
      line1: string | null,
      postalCode: string | null,
      state: string | null,
    } | null,
    features: Array< string | null > | null,
    location:  {
      __typename: "Location",
      latitude: number | null,
      longitude: number | null,
    },
    openingHours: string | null,
    rate: number | null,
    title: string,
    slots:  Array< {
      __typename: "Slot",
      parkingID: string | null,
      slotNumber: string | null,
      slotStatus: number | null,
      device: number | null,
    } | null > | null,
  } | null > | null,
};

export type OnUpdateSlotSubscription = {
  onUpdateSlot:  {
    __typename: "Slot",
    parkingID: string | null,
    slotNumber: string | null,
    slotStatus: number | null,
    device: number | null,
  } | null,
};
