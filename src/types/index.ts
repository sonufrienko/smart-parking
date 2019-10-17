import * as api from '../API';
export * from '../API';

type OpeningHour = {
  __typename: "WorkDay",
  open: {
    __typename: "DayAndTime",
    day: number,
    time: string | null,
  } | null,
  close: {
    __typename: "DayAndTime",
    day: number,
    time: string | null,
  } | null,
} | null;

export type OpeningHours = OpeningHour[] | null;

export type Parking = {
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
  openingHours:  OpeningHours,
  rate: number | null,
  title: string,
  slots:  Array< {
    __typename: "Slot",
    parkingID: string | null,
    slotNumber: string | null,
    slotStatus: number | null,
    device: number | null,
  } | null > | null
}

export type ParkingListInterface = {
  loading: boolean,
  items: Array<Parking>
}

export interface StateInterface {
  parkingList: ParkingListInterface
}

export enum ActionType {
  PARKING_FETCH_START = 'PARKING_FETCH_START',
  PARKING_FETCH_END = 'PARKING_FETCH_END'
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export interface ParkingResponse {
  data: api.ParkingQuery;
  errors: Array<{ message: string }> | null;
}

export interface Point {
  x: number,
  y: number
}
