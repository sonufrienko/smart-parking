import React from 'react';
import { Paper } from '@material-ui/core';
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

export default ParkingMetrics;