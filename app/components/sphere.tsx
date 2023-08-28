'use client'

import * as THREE from 'three';
import {useEffect, useRef} from 'react'
import { Box, useBreakpointValue} from '@chakra-ui/react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Navbar from '@/app/components/nav';
import { gsap } from "gsap";
import { Headline, Tagline } from "@/app/components/text";
import NavbarDesktop from "@/app/components/navDesktop";
import { time } from 'console';



export default function Sphere() {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const showHamburgerIcon = useBreakpointValue({ base: true, sm: false }); 

    useEffect(() => {
        if(typeof window !== 'undefined') {
            
            // ---------- Scene -----------
            const scene = new THREE.Scene();
        
            // ---------- Renderer -----------
            const renderer = new THREE.WebGLRenderer({antialias:true});
            renderer.setPixelRatio(2);
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';

            // ---------- Camera -----------
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 20;
            scene.add(camera);

            // ---------- Empty array to store all objects -----------
            let objects:THREE.Object3D[] = [];

            // ---------- globe texture -----------
            const loader = new THREE.TextureLoader();
            const texture = loader.load('./earthTexture/earth05.jpeg');
            // ---------- material globe -----------
            const geometry = new THREE.SphereGeometry(3, 64, 64);
            const material = new THREE.MeshBasicMaterial({
                map: texture
            });          
            const globe = new THREE.Mesh(geometry, material);
            globe.position.set(0, 0, 0);
            scene.add(globe);
            objects.push(globe);

            containerRef.current?.appendChild(renderer.domElement);

            // ---------- Controls -----------
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.enableZoom = false;
            
            //------------ gsap animation ---------
            const timeline = gsap.timeline({defaults: {duration: 1}});
            timeline.fromTo(globe.scale, {x: 0, y: 0, z: 0}, {x: 1.5, y: 1.5, z: 1.5})

            // ---------- Resize function that will run on window resize -----------
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            };

            // ---------- Infinite Rendering loop -----------
            const infiniteRenderingLoop = () => {
                window.addEventListener('resize', handleResize);
                controls.update();
                objects.forEach(obj => {
                    obj.rotation.y += 0.003
                })
                renderer.render(scene, camera);
                renderer.setAnimationLoop(infiniteRenderingLoop);
            }
            infiniteRenderingLoop();
            window.addEventListener('resize', handleResize);
            renderer.render(scene, camera);
            
        }
    }, []);
    return (
        <>
            <Box>
                {showHamburgerIcon && (
                    <Box position="absolute" top="4" right="4" zIndex={'docked'}>
                        <Navbar />
                    </Box>
                )}
                <NavbarDesktop />
            </Box>
            <Headline/>
            <Tagline />
            <Box height={'100vh'} width={'full'} ref={containerRef} />
        </>
    );
}