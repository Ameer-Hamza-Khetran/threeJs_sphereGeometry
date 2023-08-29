import * as THREE from 'three';
import loader from '@/app/components/3d/textureLoader';
import { earthGeometry } from "@/app/components/3d/earth";

// ----------- moon texture ---------------
const moonTexture = loader.load('./moonTexture/moon01.jpeg');

// ----------- material globe moon --------------
const moon = new THREE.MeshBasicMaterial({
    map: moonTexture
})
const moonMesh = new THREE.Mesh(earthGeometry, moon);
moonMesh.position.set(8, 0  , 0);
moonMesh.scale.set(0.2, 0.2, 0.2);

export default moonMesh;