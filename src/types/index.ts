import * as api from '../API';
export * from '../API';

export interface StateInterface {
  slots: SlotsState
}

export interface SlotsState {
  loading: boolean,
  items: SlotsState[] | null
}

export interface SlotState {
  Id: string;
  Device?: number;
  SlotNumber?: string;
  SlotStatus?: number;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface ListSlotsResponse {
  data: api.ListSlotsQuery;
}