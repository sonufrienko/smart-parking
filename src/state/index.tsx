import { StateInterface } from '../types';
import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const initialState: StateInterface = {
  parkingList: {
    loading: false,
    items: []
  }
};

export const StateContext = createContext([initialState, null] as [StateInterface, any]);
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
