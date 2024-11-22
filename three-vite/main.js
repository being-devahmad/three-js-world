import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a rendere and attach it to document
const canvas = document.querySelector("#draw")
const renderer = new THREE.WebGLRenderer({
    canvas,
    wireframe: true
});
renderer.setSize(window.innerWidth, window.innerHeight);


// Create a geometry and a material then combine them into a mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);


// Add cube to scene
scene.add(cube);

// for mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true // for smooth movement
controls.autoRotate = true


window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix() // to stop squeezing upon windows resizing
})

// function to animate our cube
function animate() {
    window.requestAnimationFrame(animate)


    // Rotate the cube for basic rotations
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    controls.update();

    // Read the scene from prespective of camera
    renderer.render(scene, camera);
}
animate()