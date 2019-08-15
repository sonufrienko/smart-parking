// tslint:disable
// this is an auto generated file. This will be overwritten

export const onUpdateSlotStatus = `subscription OnUpdateSlotStatus {
  onUpdateSlotStatus {
    Id
    Device
    SlotNumber
    SlotStatus
  }
}
`;
export const onStartParking = `subscription OnStartParking {
  onStartParking {
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
export const onFinishParking = `subscription OnFinishParking {
  onFinishParking {
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
