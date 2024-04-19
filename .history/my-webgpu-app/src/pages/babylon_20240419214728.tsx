import React from 'react';
const BabylonHome = React.lazy(() => import('@/components/babylon/home'));
const BabylonCar = React.lazy(() => import('@/components/babylon/car'));
const BabylonSnake = React.lazy(() => import('@/components/babylon/snake'));
import {Button} from '@/components/ui/button';


const Babylon = () => {
    const [home, setHome] = React.useState(true)
    const [car, setCar] = React.useState(false)
    const [snake, setSnake] = React.useState(false)
 
  return (
    <>
        <div className="fixed flex top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-white text-4xl">Babylon.js</h1>
            <div>
                <Button onClick={
                    () => {
                        setHome(true)
                        setCar(false)
                        setSnake(false)
                }}>HOME</Button>
                <Button onClick={() => {
                    setHome(false)
                    setCar(true)
                    setSnake(false)
                }}>CAR</Button>
                <Button onClick={() => {
                    setHome(false)
                    setCar(false)
                    setSnake(true)
                }}>SNAKE</Button>
            </div>
        </div>
      

        <React.Suspense fallback={<div>Loading...</div>}>
            {home && <BabylonHome />}
            {car && <BabylonCar />}
            {snake && <BabylonSnake />}
        </React.Suspense>
    </>
  );
};

export default Babylon;
