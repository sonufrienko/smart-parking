import * as api from '../API';
export * from '../API';

export interface StateInterface {
  slots: SlotsState,
  invoices: InvoicesState
}

export type InvoicesState = Map<string, InvoiceState>;

export interface InvoiceState {
  Id: string,
  UserID: string,
  SlotID: string,
  PlateNumber: string,
  DateFrom:string,
  DateTo: string,
  Price: number
}

export interface SlotsState {
  loading: boolean,
  items: SlotState[] | null
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