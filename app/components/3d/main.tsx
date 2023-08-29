'use client'

import * as THREE from 'three';
import scene from '@/app/components/3d/scene';
import renderer from '@/app/components/3d/renderer';
import solar from '@/app/components/3d/solarSystem';
import earth from '@/app/components/3d/earth';
import moonMesh from '@/app/components/3d/moon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {useEffect, useRef} from 'react'
import { Box, useBreakpointValue} from '@chakra-ui/react'
import Navbar from '@/app/components/nav';
import { gsap } from "gsap";
import { Headline, Tagline } from "@/app/components/text";
import NavbarDesktop from "@/app/components/navDesktop";

export default function Sphere() {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const showHamburgerIcon = useBreakpointValue({ base: true, sm: false }); 

    useEffect(() => {
        if(typeof window !== 'undefined') {

            // ---------- Camera -----------
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 20;
            scene.add(camera);

            // ---------- Empty array to store all objects -----------
            let objects:THREE.Object3D[] = [];

            // ---------- adding solar-system-mesh, earth to the objects array---------
            objects.push(solar);
            objects.push(earth);
            objects.push(moonMesh);

            // ---------- adding earth to the solar system mesh---------
            solar.add(earth);

            // ---------- adding moon to the earth ---------
            earth.add(moonMesh);

            containerRef.current?.appendChild(renderer.domElement);

            // ---------- Controls -----------
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.enableZoom = false;
            
            //------------ gsap animation ---------
            const timeline = gsap.timeline({defaults: {duration: 1}});
            timeline.fromTo(earth.scale, {x: 0, y: 0, z: 0}, {x: 1.5, y: 1.5, z: 1.5})

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