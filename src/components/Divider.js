import React from 'react';

const Divider = ({ padding = 0.4 }) => {
  return (
    <div className='bg-neutral-500 rounded-full my-2' style={{ padding: `${padding}px` }}></div>
  );
};

export default Divider;
