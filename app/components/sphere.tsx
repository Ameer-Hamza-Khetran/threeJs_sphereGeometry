'use client'

import * as THREE from 'three';
import {useEffect, useRef } from 'react'
import { Box, useBreakpointValue} from '@chakra-ui/react'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Navbar from '@/app/components/nav';
import { gsap } from "gsap";
import { Headline, Tagline } from "@/app/components/text";

export default function Sphere() {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const showHamburgerIcon = useBreakpointValue({ base: true, sm: false });

    useEffect(() => {
        if(typeof window !== 'undefined') {

            let size = {
                width: window.innerWidth,
                height: window.innerHeight
            }

            // ---------- Scene -----------
            const scene = new THREE.Scene();

            // ---------- Camera -----------
            const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
            camera.position.z = 20;
            scene.add(camera);

            // ---------- Renderer -----------
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(2);

            // ---------- Creating globe -----------
            const geometry = new THREE.SphereGeometry(3, 64, 64);;
            const material = new THREE.MeshStandardMaterial({
                color: '#00ff83',
                roughness: 0.2
            });
            const globe = new THREE.Mesh(geometry, material);
            // globe.position.set(0, 0, 0);
            scene.add(globe);

            // ---------- Lights -----------
            const light = new THREE.PointLight(0xffffff, 1000);
            light.position.set(0, 10, 15);
            scene.add(light);

            // ---------- Canvas -----------
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

            // ---------- Resize function that will run on window resize -----------
            const handleResize = () => {
                size.width = window.innerWidth;
                size.height = window.innerHeight;
                camera.aspect = size.width / size.height;
                renderer.setSize(size.width, size.height);
                camera.updateProjectionMatrix();
            };

            // ---------- Infinite Rendering loop -----------
            // We give an infinite rendering loop to give an illusion of animation. It is actually re-rendering the canvas
            // approx at 60 frames per second. 
            const infiniteRenderingLoop = () => {
                controls.update();
                renderer.render(scene, camera);
                renderer.setAnimationLoop(infiniteRenderingLoop);
            }
            infiniteRenderingLoop();

            //--------- Changing color of globe on mouse down Start---------
            // const blueValue = 150;
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
            
            window.addEventListener('resize', handleResize);
            renderer.render(scene, camera);
        }
    }, []);
    return (
        <Box position={'absolute'} top={'0'}>
            {showHamburgerIcon && (
                <Box position="absolute" top="4" right="4" zIndex={'docked'}>
                    <Navbar />
                </Box>
            )}
            <Box ref={containerRef} w={'100%'} h={'100vh'} m={'0'} p={'0'}>
                <Headline />
                <Tagline/>
            </Box>
        </Box>
    );
}