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
    openingHours
    rate
    title
    slots {
      slotNumber
      slotStatus
      device
    }
  }
}
`;
