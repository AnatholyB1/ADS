import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Three = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Create a material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create a cube
    const cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    scene.add(cube);

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
      geometry.dispose();
      material.dispose();
      scene.remove(cube);
    };
  }, []);

  return <div ref={ref} />;
};

export default Three;