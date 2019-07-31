import React from 'react';
import SlotItem from './SlotItem';
import { SlotState } from '../types';

function SlotsList({ title, items, loading, showDetails }: {
  title: string, items: SlotState[], loading: boolean, showDetails(item: SlotState): void
}) {
  const slotItems = items && items.length ? items.map(slot => (
    <SlotItem key={slot.Id} item={slot} showDetails={showDetails} />
  )) : null;

  return (
    <React.Fragment>
      <strong>{title}</strong>
      { loading && <div>Loading...</div> }
      <div className="slots">{slotItems}</div>
    </React.Fragment>
  );
}

export default SlotsList;
