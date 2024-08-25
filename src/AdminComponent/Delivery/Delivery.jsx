import React from 'react';

export const Delivery = () => {
    return (
      <div>
        <h1 className='text-2xl lg:text-7xl text-center font-bold pb-10 pt-10'>Delivery</h1>
        <iframe
          src="https://storage.googleapis.com/maps-solutions-p3owm30l7w/commutes/z8tf/commutes.html"
          width="100%"
          height="500px"
          align="center"
          style={{ border: '0' }}
          loading="lazy"
        />
      </div>
    );
  };