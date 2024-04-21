import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine';

const WebGPU = () => {
  const ref = useRef<HTMLCanvasElement>(null);



  useEffect(() => {

    const init = async () => {

            // Create an engine
    console.log(ref.current);
    const engine = new WebGPUEngine(ref.current!, { antialias: true });
    await engine.initAsync();

    // Create a scene
    const scene = new BABYLON.Scene(engine);

    // Create a camera
    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(ref.current, true);

    // Create a light
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Load a GLTF resource
    BABYLON.SceneLoader.ImportMesh(
      '',
      '/ct_scan__japanese_pit_viper/',
      'scene.gltf',
      scene,
      (meshes) => {
        // called when the resource is loaded
        console.log('model loaded');
        meshes[0].scaling = new BABYLON.Vector3(0.01,0.01,0.01); 
      },
      (event) => {
        // called while loading is progressing
        console.log(`${(event.loaded / event.total * 100)}% loaded`);
      },
      ( message, exception) => {
        // called when loading has errors
        console.error('An error happened', message, exception);
      },
    );

    // Render the scene
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize the engine when the window is resized
    window.addEventListener('resize', () => {
      engine.resize();
    });
        // Clean up on unmount
        return () => {
            engine.dispose();
          };

    }

    init();


  }, []);

  return <>
            <h1 className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl">WebGPU</h1>
            <canvas className="w-screen h-screen" ref={ref} />
        </>;
};

export default WebGPU;