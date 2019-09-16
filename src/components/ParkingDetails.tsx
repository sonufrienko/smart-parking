import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';
import { ParkingResponse } from '../types';
import GroundMap from './GroundMap';
import { Container, Paper } from '@material-ui/core';
import styled, { css } from 'styled-components';

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
`;

const MetricsItem = styled.div`
  border-right: 1px solid #ccc;
  padding: 10px 30px 15px 30px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:last-of-type {
    border-right: none;
  }
`;

const MetricTitle = styled.div`
  color: #777;
  margin-bottom: 5px;
  font-size: 0.85rem;
`;

const MetricValue = styled.div`
  background-color: #f1f8e9;
  color: #333;
  border-radius: 50%;
  font-weight: 500;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.type === 'free' && css`
    background-color: #4caf50;
    color: #fff;
  `}

  ${props => props.type === 'used' && css`
    background-color: #d32f2f;
    color: #fff;
  `}
`;

const MetricsPaper = styled(Paper)`
  margin: 0 0 20px 0px
`;

const DetailsWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MetricsItemComponent = ({ title, type, value }: { title: string, type: string, value: number }) => (
  <MetricsItem>
    <MetricTitle>{title}</MetricTitle>
    <MetricValue type={type}>{value}</MetricValue>
  </MetricsItem>
)

const ParkingMetrics = ({ used, total }: { used: number, total: number }) => (
  <MetricsPaper>
    <MetricsContainer>
      <MetricsItemComponent type="free" title="Free" value={total - used} />
      <MetricsItemComponent type="used" title="Used" value={used} />
      <MetricsItemComponent type="total" title="Total" value={total} />
    </MetricsContainer>
  </MetricsPaper>
)

const ParkingDetails = ({ match }) => {
  const [ slots, setSlots ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { params: { parkingID } } = match;

  useEffect(() => {
    const fetchSlotData = () => {
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
        const slotsFromRequest = firstParking && firstParking.slots && firstParking.slots.length ? firstParking.slots : [];
        setSlots(slotsFromRequest)
        setLoading(false);
      })
      .catch(response => {
        alert(response.errors.map(e => e.message).join());
        setLoading(false);
      });
    }
    
    fetchSlotData();
  }, [parkingID]);

  useEffect(() => {
    const onUpdate = data => {
      const { value: { data: { onUpdateSlot: updatedSlot } } } = data;
      
      const newSlots = slots.map(slot => 
        slot.parkingID === updatedSlot.parkingID &&
        slot.slotNumber === updatedSlot.slotNumber ? updatedSlot : slot);
      
      setSlots(newSlots);
    }

    const subscribeToUpdates = () => API.graphql(graphqlOperation(subscriptions.onUpdateSlot)
      ).subscribe({
        next: onUpdate
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
  const imageUrl = '/images/groundmap.jpg';

  return (
    <Container>
      <DetailsWrapper>
        <ParkingMetrics used={usedSlots} total={totalSlots} />
        <Paper>
          <GroundMap
            slots={slots}
            loading={loading}
            imageUrl={imageUrl}
          />
      </Paper>
      </DetailsWrapper>
    </Container>
  )
}

export default ParkingDetails;
