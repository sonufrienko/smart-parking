// tslint:disable
// this is an auto generated file. This will be overwritten

export const listSlots = `query ListSlots {
  listSlots {
    Id
    Device
    SlotNumber
    SlotStatus
  }
}
`;
export const listInvoices = `query ListInvoices {
  listInvoices {
    Id
    UserID
    SlotID
    PlateNumber
    DateFrom
    DateTo
    Price
  }
}
`;
export const listParkingInfo = `query ListParkingInfo {
  listParkingInfo {
    ID
    Title
    Rate
    Address {
      City
      CountryCode
      Line1
      PostalCode
      State
    }
    Location {
      Latitude
      Longitude
    }
    Features
    OpeningHours
  }
}
`;
export const getParkingInfo = `query GetParkingInfo($ID: ID!) {
  getParkingInfo(ID: $ID) {
    ID
    Title
    Rate
    Address {
      City
      CountryCode
      Line1
      PostalCode
      State
    }
    Location {
      Latitude
      Longitude
    }
    Features
    OpeningHours
  }
}
`;
