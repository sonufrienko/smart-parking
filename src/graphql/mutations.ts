// tslint:disable
// this is an auto generated file. This will be overwritten

export const updateSlot = `mutation UpdateSlot($input: UpdateSlotStatusInput!) {
  updateSlot(input: $input) {
    parkingID
    slotNumber
    slotStatus
    device
  }
}
`;
export const createInvoice = `mutation CreateInvoice($input: CreateInvoiceInput!) {
  createInvoice(input: $input) {
    parkingID
    invoiceID
    slotNumber
    dateFrom
    dateTo
    plateNumber
    price
    parking {
      parkingID
      address {
        city
        countryCode
        line1
        postalCode
        state
      }
      features
      location {
        latitude
        longitude
      }
      rate
      title
      freeSlots
      slots {
        parkingID
        slotNumber
        slotStatus
        device
      }
    }
  }
}
`;
export const closeInvoice = `mutation CloseInvoice($input: CloseInvoiceInput!) {
  closeInvoice(input: $input) {
    parkingID
    invoiceID
    slotNumber
    dateFrom
    dateTo
    plateNumber
    price
    parking {
      parkingID
      address {
        city
        countryCode
        line1
        postalCode
        state
      }
      features
      location {
        latitude
        longitude
      }
      rate
      title
      freeSlots
      slots {
        parkingID
        slotNumber
        slotStatus
        device
      }
    }
  }
}
`;
