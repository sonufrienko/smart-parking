import { StateInterface } from '../types';
import React, { createContext, useContext, useReducer } from 'react';
import mainReducer from './reducers';

const initialState: StateInterface = {
  slots: {
    loading: false,
    items: null
  },
  invoices: new Map()
};

export const StateContext = createContext([] as any[]);
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
