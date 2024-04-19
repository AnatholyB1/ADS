import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

const BabylonHome = () => {
  const ref = useRef<HTMLCanvasElement >(null);

  useEffect(() => {
    // Create an engine
    const engine = new BABYLON.Engine(ref.current, true);

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
      '/modern_building_-_gallery_-_office/',
      'scene.gltf',
      scene,
      (meshes) => {
        // called when the resource is loaded
        console.log('model loaded');
        meshes[0].scaling = new BABYLON.Vector3(0.1,0.1,0.1); // adjust as needed
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
  }, []);

  return (

      <canvas className="w-screen h-screen" ref={ref} />

  );
};

export default BabylonHome;
