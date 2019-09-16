import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { ParkingResponse } from '../types';
import GroundMap from './GroundMap';
import { Container, Paper } from '@material-ui/core';
import styled from 'styled-components';
import ParkingMetrics from './ParkingMetrics';
import Maps from '../maps';

const DetailsWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const updateSlotInArray = ({ updatedSlot, slots }) => slots.map(slot => 
  slot.parkingID === updatedSlot.parkingID &&
  slot.slotNumber === updatedSlot.slotNumber ? updatedSlot : slot);

const getSlotsFromResponse = ({ data }) => {
  const firstParking = data.parking && data.parking.length ? data.parking[0] : null;
  const slots = firstParking && firstParking.slots && firstParking.slots.length ? firstParking.slots : [];
  return slots;
}

const handleAPIError = err => {
  alert(err.errors.map(e => e.message).join());
}

const QUERY_SLOTS_ONLY = `query Parking($filter: ParkingFilterInput) {
  parking(filter: $filter) {
    slots {
      parkingID
      slotNumber
      slotStatus
      device
    }
  }
}`;

const ParkingDetails = ({ match }) => {
  const [ slots, setSlots ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { params: { parkingID } } = match;

  useEffect(() => {
    const fetchSlotData = async () => {
      setLoading(true);

      const queryOptions = {
        filter: {
          parkingID
        }
      };
  
      try {
        const response: ParkingResponse = await API.graphql(graphqlOperation(QUERY_SLOTS_ONLY, queryOptions));
        const slotsFromResponse = getSlotsFromResponse(response);
        setSlots(slotsFromResponse);
      } catch (e) {
        handleAPIError(e);
      }

      setLoading(false);
    }
    
    fetchSlotData();
  }, [parkingID]);

  useEffect(() => {
    const onUpdate = data => {
      const { value: { data: { onUpdateSlot: updatedSlot } } } = data;
      const newSlots = updateSlotInArray({ updatedSlot, slots });
      setSlots(newSlots);
    }

    const subscribeToUpdates = () => API.graphql(graphqlOperation(subscriptions.onUpdateSlot)
      ).subscribe({
        next: onUpdate,
        error: handleAPIError
      });
  
    let subscriptionToUpdates;
    if (!subscriptionToUpdates) {
      subscriptionToUpdates = subscribeToUpdates();
    }

    return () => {
      subscriptionToUpdates.unsubscribe();
    }
  }, [slots]);

  const usedSlots = slots.filter(slot => slot.slotStatus).length;
  const totalSlots = slots.length;
  
  const mapConfig = Maps.find(map => map.parkingID === parkingID) || Maps[0];
  const { imageUrl, coordinates } = mapConfig;
  const coordinatesOfSlots = coordinates;

  return (
    <Container>
      <DetailsWrapper>
        <ParkingMetrics used={usedSlots} total={totalSlots} />
        <Paper>
          <GroundMap
            slots={slots}
            loading={loading}
            imageUrl={imageUrl}
            coordinatesOfSlots={coordinatesOfSlots}
          />
      </Paper>
      </DetailsWrapper>
    </Container>
  )
}

export default ParkingDetails;
