import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(2);
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';

export default renderer;