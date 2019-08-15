import React from 'react';
import SlotItem from './SlotItem';
import { SlotState, InvoicesState } from '../types';

function SlotsList({ title, items, invoices, loading, showDetails }: {
  title: string, items: SlotState[], invoices: InvoicesState, loading: boolean, showDetails(item: SlotState): void
}) {
  const slotItems = items && items.length ? items.map(slot => {
    const invoice = invoices.get(slot.Id) || {
      Id: '',
      UserID: '',
      SlotID: '',
      PlateNumber: '',
      DateFrom: '',
      DateTo: '',
      Price: 0
    };
    return (
      <SlotItem key={slot.Id} item={slot} invoice={invoice} showDetails={showDetails} />
    )
  }) : null;

  return (
    <React.Fragment>
      <h1>{title}</h1>
      { loading && <div>Loading...</div> }
      <div className="slots">{slotItems}</div>
    </React.Fragment>
  );
}

export default SlotsList;
