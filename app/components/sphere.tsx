'use client'

import * as THREE from 'three';
import {useEffect, useRef} from 'react'
import { Box, useBreakpointValue} from '@chakra-ui/react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Navbar from '@/app/components/nav';
import { gsap } from "gsap";
import { Headline, Tagline } from "@/app/components/text";
import NavbarDesktop from "@/app/components/navDesktop";



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

            // ---------- material globe -----------
            const geometry = new THREE.SphereGeometry(3, 64, 64);;
            const material = new THREE.MeshStandardMaterial({
                color: '#00ff83',
                roughness: 0.2
            });
            if (material.map) {
                material.map.magFilter = THREE.LinearFilter;
                material.map.minFilter = THREE.LinearMipmapLinearFilter;
            }           
            const globe = new THREE.Mesh(geometry, material);
            globe.position.set(0, 0, 0);
            scene.add(globe);

            // ---------- Lights -----------
            const light = new THREE.PointLight(0xffffff, 1000);
            light.position.set(0, 10, 15);
            scene.add(light);

            containerRef.current?.appendChild(renderer.domElement);

            // ---------- Controls -----------
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 5;
            
            //------------ gsap animation ---------
            const timeline = gsap.timeline({defaults: {duration: 1}});
            timeline.fromTo(globe.scale, {x: 0, y: 0, z: 0}, {x: 1.5, y: 1.5, z: 1.5})

            //--------- Changing color of globe on mouse down Start---------
            let mouseDown = false;

            window.addEventListener('mousedown', () => {
                mouseDown = true;
            });

            window.addEventListener('mouseup', () => {
                mouseDown = false;
            });

            window.addEventListener('mousemove', (e) => {
                if (mouseDown) {
                    const normalizedX:number = e.clientX / window.innerWidth;
                    const normalizedY:number = e.clientY / window.innerHeight;

                    const r = Math.round(normalizedX * 255);
                    const g = Math.round(normalizedY * 255);
                    const b = Math.round((1 - normalizedX) * 255);

                    const color = new THREE.Color(r / 255, g / 255, b / 255);
                    gsap.to(globe.material.color, {
                        r: color.r,
                        g: color.g,
                        b: color.b,
                        duration: 0.3,
                    });
                }
            });
            //--------- Changing color of globe on mouse down End---------

            // ---------- Resize function that will run on window resize -----------
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            };

            // ---------- Infinite Rendering loop -----------
            const infiniteRenderingLoop = () => {
                window.addEventListener('resize', handleResize);
                controls.update();
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