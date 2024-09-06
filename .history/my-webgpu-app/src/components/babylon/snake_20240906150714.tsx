import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { useLoading } from '@/hook/loading';

const BabylonSnake = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { showLoading, hideLoading, setNumberState } = useLoading();

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
      '/ct_scan__japanese_pit_viper/',
      'scene.gltf',
      scene,
      (meshes) => {
        // called when the resource is loaded
        hideLoading();
        meshes[0].scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);

        // Create a sphere to represent the point
        const sphere = BABYLON.MeshBuilder.CreateSphere('point', { diameter: 0.05 }, scene);
        sphere.position = new BABYLON.Vector3(0.5, 0, 0); // Adjust the position as needed

        // Add an action manager to the sphere
        sphere.actionManager = new BABYLON.ActionManager(scene);
        sphere.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
            // Zoom the camera to the sphere
            camera.setTarget(sphere.position);
            camera.radius = 0.5; // Adjust the zoom level as needed

            // Display a legend
            const legend = document.createElement('div');
            legend.innerText = 'This is a point of interest';
            legend.style.position = 'absolute';
            legend.style.top = '10px';
            legend.style.left = '10px';
            legend.style.backgroundColor = 'white';
            legend.style.padding = '10px';
            legend.style.border = '1px solid black';
            document.body.appendChild(legend);
          })
        );
      },
      (event) => {
        // called while loading is progressing
        showLoading();
        setNumberState((event.loaded / event.total) * 100);
      },
      (message, exception) => {
        // called when loading has errors
        hideLoading();
        console.error('An error happened', message, exception);
      }
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

  return <canvas id="snake" className="w-screen h-screen" ref={ref} />;
};

export default BabylonSnake;