'use client'

import * as THREE from 'three';
import {useEffect, useRef } from 'react'
import { Box, } from '@chakra-ui/react'

export default function Sphere() {

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(typeof window !== 'undefined') {

            // ---------- Scene -----------
            const scene = new THREE.Scene();

            // ---------- Camera -----------
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 20;
            scene.add(camera);

            // ---------- Renderer -----------
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

            // ---------- Creating globe -----------
            const geometry = new THREE.SphereGeometry(3, 64, 64);;
            const material = new THREE.MeshStandardMaterial({
                color: '#00ff83',
            });
            const globe = new THREE.Mesh(geometry, material);
            scene.add(globe);

            // ---------- Lights -----------
            const light = new THREE.PointLight(0xffffff, 150);
            light.position.set(0, 10, 10);
            scene.add(light);

            // ---------- Canvas -----------
            containerRef.current?.appendChild(renderer.domElement);

            

            
            renderer.render(scene, camera);
        }
    }, []);
    return <Box ref={containerRef} w={'100%'} h={'100vh'} m={'0'}/>;
}