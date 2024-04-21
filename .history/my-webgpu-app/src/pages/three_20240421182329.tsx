import React from 'react';
const ThreeHome = React.lazy(() => import('@/components/three/home'));
const ThreeCar = React.lazy(() => import('@/components/three/car'));
const ThreeSnake = React.lazy(() => import('@/components/three/snake'));
import {Button} from '@/components/ui/button';

const Three = () => {
  const [home, setHome] = React.useState(true)
    const [car, setCar] = React.useState(false)
    const [snake, setSnake] = React.useState(false)
 
  return (
    <>
        <div className="fixed flex flex-start items-center justify-center gap-4 flex-col p-4  top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className=" text-white text-4xl">Three.js</h1>
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
            {home && <ThreeHome />}
            {car && <ThreeCar />}
            {snake && <ThreeSnake />}
        </React.Suspense>
    </>
  );
};

export default Three;