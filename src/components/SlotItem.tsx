import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { SlotState } from '../types';

function SlotItem({ item, showDetails }: {
  item: SlotState, showDetails(item: SlotState): void
}) {
  const { Id, Device, SlotNumber, SlotStatus } = item;
  const divStyle = useSpring({ height: SlotStatus ? 80 : 0 });

  return (
    <div onClick={() => showDetails(item)} className={`slot-item ${SlotStatus ? 'unavailable' : ''}`} title={`Device: ${Device}`}>
      <animated.div className="item-fill" style={divStyle} />
      <animated.div className="item-content">{SlotNumber}</animated.div>
    </div>
  );
}

export default SlotItem;
