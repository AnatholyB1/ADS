import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

 

const Three = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Load a GLTF resource
    const loader = new GLTFLoader();
    loader.load(
        '/ct_scan__japanese_pit_viper/scene.gltf', // replace with the path to your .gltf file
        (gltf) => {
        // called when the resource is loaded
        const snake = gltf.scene;
        scene.add(snake);  
        },
        (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
        },
        (error) => {
        // called when loading has errors
        console.error('An error happened', error);
        },
    );

    renderer.render(scene, camera);


    // Append the renderer to the component
    if (ref.current) {
      ref.current.appendChild(renderer.domElement);
    }

    // Clean up on unmount
    return () => {
      if (ref.current) {
        ref.current.removeChild(renderer.domElement);
      }
      renderer.dispose();   
    };
  }, []);

  return <div ref={ref} />;
};

export default Three;