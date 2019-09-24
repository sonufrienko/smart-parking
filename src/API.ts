/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateSlotStatusInput = {
  parkingID: string,
  device: number,
  slotStatus: number,
};

export type CreateInvoiceInput = {
  parkingID?: string | null,
  slotNumber?: string | null,
  plateNumber?: string | null,
};

export type CloseInvoiceInput = {
  parkingID?: string | null,
  invoiceID?: string | null,
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

export type CreateInvoiceMutationVariables = {
  input: CreateInvoiceInput,
};

export type CreateInvoiceMutation = {
  createInvoice:  {
    __typename: "Invoice",
    parkingID: string | null,
    invoiceID: string | null,
    slotNumber: string | null,
    dateFrom: string | null,
    dateTo: string | null,
    plateNumber: string | null,
    price: number | null,
    parking:  {
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
      rate: number | null,
      title: string,
      freeSlots: number,
      slots:  Array< {
        __typename: "Slot",
        parkingID: string | null,
        slotNumber: string | null,
        slotStatus: number | null,
        device: number | null,
      } | null > | null,
    } | null,
  } | null,
};

export type CloseInvoiceMutationVariables = {
  input: CloseInvoiceInput,
};

export type CloseInvoiceMutation = {
  closeInvoice:  {
    __typename: "Invoice",
    parkingID: string | null,
    invoiceID: string | null,
    slotNumber: string | null,
    dateFrom: string | null,
    dateTo: string | null,
    plateNumber: string | null,
    price: number | null,
    parking:  {
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
      rate: number | null,
      title: string,
      freeSlots: number,
      slots:  Array< {
        __typename: "Slot",
        parkingID: string | null,
        slotNumber: string | null,
        slotStatus: number | null,
        device: number | null,
      } | null > | null,
    } | null,
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
    openingHours:  Array< {
      __typename: "WorkDay",
      open:  {
        __typename: "DayAndTime",
        day: number,
        time: string | null,
      } | null,
      close:  {
        __typename: "DayAndTime",
        day: number,
        time: string | null,
      } | null,
    } | null > | null,
    rate: number | null,
    title: string,
    freeSlots: number,
    slots:  Array< {
      __typename: "Slot",
      parkingID: string | null,
      slotNumber: string | null,
      slotStatus: number | null,
      device: number | null,
    } | null > | null,
  } | null > | null,
};

export type MeQuery = {
  me:  {
    __typename: "User",
    userID: string | null,
    fullName: string | null,
    email: string | null,
    phone: string | null,
    vehicles:  Array< {
      __typename: "Vehicle",
      make: string | null,
      model: string | null,
      plateNumber: string | null,
    } | null > | null,
    invoices:  Array< {
      __typename: "Invoice",
      parkingID: string | null,
      invoiceID: string | null,
      slotNumber: string | null,
      dateFrom: string | null,
      dateTo: string | null,
      plateNumber: string | null,
      price: number | null,
      parking:  {
        __typename: "Parking",
        parkingID: string,
        features: Array< string | null > | null,
        rate: number | null,
        title: string,
        freeSlots: number,
      } | null,
    } | null > | null,
  } | null,
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
