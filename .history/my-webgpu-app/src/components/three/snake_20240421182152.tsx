import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DragControls, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

 

const ThreeSnake = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10); // move the camera back

    // Create lights and add them to the scene
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // white directional light
    scene.add(directionalLight);


    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

      // Create controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    const draggableObjects : THREE.Group<THREE.Object3DEventMap>[] = []; // this array will hold the objects that can be dragged

    // Load a GLTF resource
    const loader = new GLTFLoader();
    loader.load(
        '/ct_scan__japanese_pit_viper/scene.gltf', // replace with the path to your .gltf file
        (gltf) => {
            // called when the resource is loaded
            gltf.scene.scale.set(0.1, 0.1, 0.1); // scale down the model
            gltf.scene.position.set(0, 0, 0); // move the model to the origin
            scene.add(gltf.scene);

            // Add the model to the draggableObjects array
            draggableObjects.push(gltf.scene);
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
        
    // Create drag controls
    const dragControls = new DragControls(draggableObjects, camera, renderer.domElement);

    // Animation function
    const animate = () => {
        requestAnimationFrame(animate);

        // Render the scene
        renderer.render(scene, camera);
    };

    // Start the animation
    animate();

    const currentRef = ref.current;
    // Append the renderer to the component
    if (currentRef) {
        currentRef.appendChild(renderer.domElement);
    }

    // Clean up on unmount
    return () => {
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
      }
      renderer.dispose();
      orbitControls.dispose();
      dragControls.dispose();   
    };
  }, []);

  return <>
    <div ref={ref} />
  </>;
};

export default ThreeSnake;