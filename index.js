import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const textureLoader = new THREE.TextureLoader()
// const myTexture = textureLoader.load('coolTex.jpg')

const loader = new THREE.TextureLoader()
// const cross = loader.load('./cross.png')
const cross = loader.load('cross.png')

// Object
// const geometry = new THREE.BoxGeometry(1,1,1)
// const geometry2 = new THREE.DodecahedronGeometry(0.5,3)
// const material = new THREE.MeshBasicMaterial({
//     map: myTexture
// })
// const boxMesh = new THREE.Mesh(geometry,material)
// const sphereMesh = new THREE.Mesh(geometry2,material)
// scene.add(boxMesh)
// // scene.add(sphereMesh)
// boxMesh.position.x = 0
// boxMesh.position.y = 0.8
// sphereMesh.position.x = -1.6
// sphereMesh.position.y = 0.5
// geometry.center()

const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

const particleGeometry = new THREE.BufferGeometry
const particlesCount = 5000

const posArray = new Float32Array(particlesCount *3) 

for(let i = 0; i < particlesCount *3 ; i++ ){
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))


// Sizes
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

// Materials

const material = new THREE.PointsMaterial({
    size: 0.005
})

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    map: cross,
    transparent: true
})

// Mesh
const sphere = new THREE.Points(geometry,material)
const particlesMesh = new THREE.Points(particleGeometry, particlesMaterial)
//scene.add(sphere)
scene.add(particlesMesh)


// Renderer gets updated each time window is resized
window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
})

// Camera
// const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
// camera.position.z = 3
// scene.add(camera)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)

controls.enableZoom = false;
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setClearColor(new THREE.Color('#255f85'), 1)


// const clock = new THREE.Clock()

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     boxMesh.rotateX(30*0.0003)
//     boxMesh.rotateY(30*0.0003)
//     sphereMesh.rotateY(30*0.0003)
//     // mesh.position.y = Math.sin(elapsedTime) *0.1
//     boxMesh.position.z = Math.sin(elapsedTime) * 1

//     controls.update()
//     controls.enableDamping = true
//     renderer.render(scene,camera)
//     window.requestAnimationFrame(tick)
// };

// tick()

/**
 * Animate
 */
 
 document.addEventListener('mousemove', animateParticles)

 let mouseX = 0
 let mouseY = 0
 
 let targetX = 0
 let targetY = 0
 
 function animateParticles(event){
     mouseY = event.clientY
     mouseX = event.clientX
 }
 
 const clock = new THREE.Clock()
 
 const tick = () =>
 {
 
     targetX = mouseX * -0.001
     targetY = mouseY * -0.001
 
     const elapsedTime = clock.getElapsedTime()
 
     // Update objects
     sphere.rotation.y = .5 * elapsedTime
     particlesMesh.rotation.y = -.09 * elapsedTime
 
     if (mouseX > 0){
         // particlesMesh.rotation.y = -0.00004 * mouseX * elapsedTime      
         // particlesMesh.rotation.x = -0.00004 * mouseY * elapsedTime
         // particlesMesh.rotation.y += .005 * (targetX - particlesMesh.rotation.y) 
         particlesMesh.rotation.x += .005 * (targetY - particlesMesh.rotation.x) 
     }
 
     
     // Update Orbital Controls
     // controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()