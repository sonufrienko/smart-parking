// tslint:disable
// this is an auto generated file. This will be overwritten

export const updateSlotStatus = `mutation UpdateSlotStatus($input: UpdateSlotStatusInput!) {
  updateSlotStatus(input: $input) {
    Id
    Device
    SlotNumber
    SlotStatus
  }
}
`;
export const startParking = `mutation StartParking($input: StartParkingInput!) {
  startParking(input: $input) {
    Id
    UserID
    PlateNumber
    DateFrom
    DateTo
    Price
  }
}
`;
export const finishParking = `mutation FinishParking($input: FinishParkingInput!) {
  finishParking(input: $input) {
    Id
    UserID
    PlateNumber
    DateFrom
    DateTo
    Price
  }
}
`;
