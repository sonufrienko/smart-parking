// tslint:disable
// this is an auto generated file. This will be overwritten

export const parking = `query Parking($filter: ParkingFilterInput) {
  parking(filter: $filter) {
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
    openingHours {
      open {
        day
        time
      }
      close {
        day
        time
      }
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
`;
export const me = `query Me {
  me {
    userID
    fullName
    email
    phone
    vehicles {
      make
      model
      plateNumber
    }
    invoices {
      parkingID
      invoiceID
      slotNumber
      dateFrom
      dateTo
      plateNumber
      price
      parking {
        parkingID
        features
        rate
        title
        freeSlots
      }
    }
  }
}
`;
