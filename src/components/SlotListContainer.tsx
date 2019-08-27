import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { ListSlotsResponse } from '../types';
import { useStateValue } from '../state';
// import SlotsList from './SlotList';
import GroundMap from './GroundMap';

API.configure(awsconfig);

function SlotsContainer() {
  const [
    {
      slots: {
        loading,
        items
      },
      invoices
    },
    dispatch
  ] = useStateValue();

  useEffect(() => {
    if (!items && !loading) {
      fetchData();
    }

    let subscriptionToUpdates;
    let subscriptionToStartParking;
    let subscriptionToFinishParking;

    if (!subscriptionToUpdates) {
      subscriptionToUpdates = subscribeToUpdates();
    }

    if (!subscriptionToStartParking) {
      subscriptionToStartParking = subscribeToStartParking();
    }

    if (!subscriptionToFinishParking) {
      subscriptionToFinishParking = subscribeToFinishParking();
    }

    if (items) {
      document.title = `Free slots: ${items.filter(item => !!!item.SlotStatus).length}`;
    }

    return () => {
      // Cleanup on component unmount
      subscriptionToUpdates.unsubscribe();
      subscriptionToStartParking.unsubscribe();
      subscriptionToFinishParking.unsubscribe();
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

  function subscribeToUpdates() {
    return API.graphql(
      graphqlOperation(subscriptions.onUpdateSlotStatus)
    ).subscribe({
      next: (slotData) => {
        const { value: { data: { onUpdateSlotStatus } } } = slotData;
        dispatch({
          type: 'SLOT_STATUS_CHANGED',
          payload: onUpdateSlotStatus
        });
      }
    });
  }

  function subscribeToStartParking() {
    return API.graphql(
      graphqlOperation(subscriptions.onStartParking)
    ).subscribe({
      next: (response) => {
        const { value: { data: { onStartParking } } } = response;
        dispatch({
          type: 'START_PARKING',
          payload: onStartParking
        });
      }
    });
  }

  function subscribeToFinishParking() {
    return API.graphql(
      graphqlOperation(subscriptions.onFinishParking)
    ).subscribe({
      next: (response) => {
        const { value: { data: { onFinishParking } } } = response;
        dispatch({
          type: 'FINISH_PARKING',
          payload: onFinishParking
        });
      }
    });
  }

  return (
    <React.Fragment>
      <GroundMap 
        title="Amsterdam Central Parking NEW 2" 
        items={items}
        invoices={invoices}
        loading={loading}
        imageUrl="/images/groundmap.jpg"
      />
    </React.Fragment>
  );
}

export default SlotsContainer;
