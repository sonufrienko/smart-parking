import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { SlotState, InvoiceState } from '../types';

function SlotItem({ item, invoice, showDetails }: {
  item: SlotState, 
  invoice: InvoiceState | null,
  showDetails(item: SlotState): void
}) {
  const { Id, Device, SlotNumber, SlotStatus } = item;
  const divStyle = useSpring({ height: SlotStatus ? 120 : 0 });
  const plateNumber = invoice && invoice.PlateNumber !== '' ? (
    <div className="plate-number">
      {invoice.PlateNumber}
    </div>
  ) : null;

  return (
    <div onClick={() => showDetails(item)} className={`slot-item ${SlotStatus ? 'unavailable' : ''}`} title={`Device: ${Device}`}>
      <animated.div className="item-fill" style={divStyle} />
      <animated.div className="item-content">
        {SlotNumber}
        {plateNumber}
      </animated.div>
    </div>
  );
}

export default SlotItem;
