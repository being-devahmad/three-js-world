const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5
scene.add(camera)

const box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(box, material);

// mesh.rotation.y = 7
// mesh.scale.x = 4

scene.add(mesh)


const canvas = document.querySelector("#draw")
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)


let clock = new THREE.Clock()
console.log("clock->", clock)

function animate() {
    window.requestAnimationFrame(animate) // it'll will run accoridng to system's fps like 30fps or 60fps
    renderer.render(scene, camera)
    mesh.rotation.y = clock.getElapsedTime() * 3;

}

animate()