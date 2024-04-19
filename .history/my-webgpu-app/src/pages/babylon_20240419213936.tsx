import React from 'react';
const BabylonHome = React.lazy(() => import('@/components/babylon/home'));
const BabylonCar = React.lazy(() => import('@/components/babylon/car'));
const BabylonSnake = React.lazy(() => import('@/components/babylon/snake'));


const Babylon = () => {
 
  return (
    <>
      <h1 className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl">Babylon.js</h1>
        <React.Suspense fallback={<div>Loading...</div>}>
            <BabylonHome />
            <BabylonCar />
            <BabylonSnake />
        </React.Suspense>
    </>
  );
};

export default Babylon;
