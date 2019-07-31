import React, { useState, useEffect, useMemo } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { ListSlotsResponse } from '../types';
import { useStateValue } from '../state';
import SlotsList from './SlotList';

API.configure(awsconfig);

function SlotsContainer() {
  const [
    {
      slots: {
        loading,
        items
      }
    },
    dispatch
  ] = useStateValue();

  useEffect(() => {
    if (!items && !loading) {
      fetchData();
    }

    if (items) {
      document.title = `Free slots: ${items.filter(item => !!!item.SlotStatus).length}`;
    }
  });

  function fetchData() {
    dispatch({
      type: 'SLOTS_FETCH_START'
    });

    API.graphql(graphqlOperation(queries.listSlots)).then((response: ListSlotsResponse) => {
      const { data: { listSlots } } = response;
      dispatch({
        type: 'SLOTS_FETCH_END',
        payload: listSlots
      });
    });
  }

  function showDetails(slot) {
    // TODO
  }

  return (
    <React.Fragment>
      <SlotsList 
        title="Amsterdam Central Parking" 
        items={items} 
        loading={loading} 
        showDetails={showDetails} 
      />
    </React.Fragment>
  );
}

export default SlotsContainer;
