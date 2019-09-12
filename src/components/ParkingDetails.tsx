import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import * as subscriptions from '../graphql/subscriptions';
import { ParkingResponse } from '../types';
import { useStateValue } from '../state';
import GroundMap from './GroundMap';
import { Container, Paper } from '@material-ui/core';

API.configure(awsconfig);

function ParkingDetails({ match, location, history }) {
  const [ slots, setSlots ] = useState<any[] | null>([]);
  const [ loading, setLoading ] = useState<boolean>(false);

  const [
    {
      parkingList: {
        items
      }
    }
  ] = useStateValue();

  const { params: { parkingID } } = match;
  const parking = items.find(item => item.parkingID === parkingID);


  useEffect(() => {
    fetchData();
    

    let subscriptionToUpdates;
    let subscriptionToStartParking;
    let subscriptionToFinishParking;

    // if (!subscriptionToUpdates) {
    //   subscriptionToUpdates = subscribeToUpdates();
    // }

    // if (items) {
    //   document.title = `Free slots: ${items.filter(item => !!!item.parkingID).length}`;
    // }

    return () => {
      // Cleanup on component unmount
      // subscriptionToUpdates.unsubscribe();
    }
  }, [parkingID]);

  function fetchData() {
    setLoading(true);
    const queryForSlotsOnly = `query Parking($filter: ParkingFilterInput) {
      parking(filter: $filter) {
        slots {
          parkingID
          slotNumber
          slotStatus
          device
        }
      }
    }`;

    const filterByParkingID = {
      parkingID
    };

    API.graphql(graphqlOperation(queryForSlotsOnly, {filter: filterByParkingID}))
    .then((response: ParkingResponse) => {
      const { data } = response;
      const firstParking = data.parking && data.parking.length ? data.parking[0] : null;
      const slotsFromRequest = firstParking ? firstParking.slots : [];
      setSlots(slotsFromRequest)
      setLoading(false);
    })
    .catch(response => {
      alert(response.errors.map(e => e.message).join());
      setLoading(false);
    });
  }

  // function subscribeToUpdates() {
  //   return API.graphql(
  //     graphqlOperation(subscriptions.onUpdateSlotStatus)
  //   ).subscribe({
  //     next: (slotData) => {
  //       const { value: { data: { onUpdateSlotStatus } } } = slotData;
  //       dispatch({
  //         type: 'SLOT_STATUS_CHANGED',
  //         payload: onUpdateSlotStatus
  //       });
  //     }
  //   });
  // }

  return (
    <Paper>
      <GroundMap
        items={slots}
        loading={loading}
        imageUrl="/images/groundmap.jpg"
      />
    </Paper>
  );
}



const ParkingDetailsContainer = (props) => (  
  <Container>
    <div className="box-center" style={{ flexDirection: 'column', alignItems: 'center' }}>
      <ParkingDetails {...props} />
      <Paper style={{ marginTop: 20, width: 360 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div>Free<div>10</div></div>
          <div>Used<div>20</div></div>
          <div>Total<div>280</div></div>
        </div>
      </Paper>
    </div>
  </Container>
)

export default ParkingDetailsContainer;
