import React from 'react';
const WebGPUHome = React.lazy(() => import('@/components/webGPU/home'));
const WebGPUCar = React.lazy(() => import('@/components/webGPU/car'));
const WebGPUSnake = React.lazy(() => import('@/components/webGPU/snake'));
import {Button} from '@/components/ui/button';

const WebGPU = () => {
  const [home, setHome] = React.useState(true)
    const [car, setCar] = React.useState(false)
    const [snake, setSnake] = React.useState(false)
 
  return (
    <>
        <div className="fixed flex flex-start items-center justify-center gap-4 flex-col p-4  top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-white text-4xl">WebGPU.js</h1>
            <div className="flex flex-row items-center justify-between gap-2">
                <Button onClick={
                    () => {
                        setHome(true)
                        setCar(false)
                        setSnake(false)
                }}>Architecture</Button>
                <Button onClick={() => {
                    setHome(false)
                    setCar(true)
                    setSnake(false)
                }}>E-Commerce</Button>
                <Button onClick={() => {
                    setHome(false)
                    setCar(false)
                    setSnake(true)
                }}>Education</Button>
            </div>
        </div>
      

        <React.Suspense fallback={<div>Loading...</div>}>
            {home && <WebGPUHome />}
            {car && <WebGPUCar />}
            {snake && <WebGPUSnake />}
        </React.Suspense>
    </>
  );
};

export default WebGPU;