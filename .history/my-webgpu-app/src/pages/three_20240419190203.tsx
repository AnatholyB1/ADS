import * as THREE from 'three';

// Créer une scène
const Three = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer un rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créer une géométrie
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Créer un matériau
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Créer un cube
const cube = new THREE.Mesh(geometry, material);

// Ajouter le cube à la scène
Three.add(cube);

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);

  // Animer le cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Rendre la scène
  renderer.render(Three, camera);
}

// Commencer l'animation
animate();

export default Three;