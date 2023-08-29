import * as THREE from 'three';
import loader from "@/app/components/3d/textureLoader";

 // ---------- earth texture -----------
 const earthTexture = loader.load('./earthTexture/earth05.jpeg');

 // ---------- earth material -----------
 const earthGeometry = new THREE.SphereGeometry(3, 64, 64);
 const earthMaterial = new THREE.MeshBasicMaterial({
     map: earthTexture
 });          
 const earth = new THREE.Mesh(earthGeometry, earthMaterial);
 earth.position.set(0, 0, 0);

export {earthGeometry};
export default earth;