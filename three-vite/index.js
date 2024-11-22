import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as lil from "lil-gui"

// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Add studio lighting

// Hight Intensity Light
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2)
highIntensityLight.position.set(10, 20, 15)
scene.add(highIntensityLight)


// Ambient light for overall scene illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Main directional light (key light)
const mainLight = new THREE.DirectionalLight(0xffffff, 1);
mainLight.position.set(10, 10, 10);
scene.add(mainLight);

// Fill light from opposite side
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-10, 0, -10);
scene.add(fillLight);

// Back light for rim highlighting
const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, 5, -10);
scene.add(backLight);


// Position camera
camera.position.z = 5;


// Add a texture
const loader = new THREE.TextureLoader()
const color = loader.load("./text/color.jpg")
const roughness = loader.load("./text/roughness.jpg")
const normal = loader.load("./text/normalOpenGl.png")
const height = loader.load("./text/height.png")

// Create box mesh
const geometry = new THREE.BoxGeometry(3, 2, 2);
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
//     // side: THREE.DoubleSide // if you want back face of model to be shown
// });


// Mesh Standard Material
const material = new THREE.MeshStandardMaterial({
    map: color,
    roughnessMap: roughness,
    normalMap: normal,

})


const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


// Add lil-gui
const gui = new lil.GUI();

// Material Settings
const materialFolder = gui.addFolder("Material")
materialFolder.add(material, "roughness", 0, 1).name("Rouhness")
materialFolder.add(material, "metalness", 0, 1).name("Metalness")
materialFolder.add(material, "roughness", 0, 1).name("Rouhness")
materialFolder.addColor(material, "color").name("Color")
materialFolder.open();

// Mesh Sttings
const meshFolder = gui.addFolder("Mesh")
meshFolder.add(cube.scale, 'x', 0.1, 5).name('Scale X')
meshFolder.add(cube.scale, 'x', 0.1, 5).name('Scale Y')
meshFolder.add(cube.scale, 'x', 0.1, 5).name('Scale Z')
meshFolder.add(cube.position, 'x', -10, 10).name('Position X')
meshFolder.add(cube.position, 'x', -10, 10).name('Position Y')
meshFolder.add(cube.position, 'x', -10, 10).name('Position Z')
meshFolder.open()


// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
});





// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    controls.update()

    renderer.render(scene, camera);
}
animate();