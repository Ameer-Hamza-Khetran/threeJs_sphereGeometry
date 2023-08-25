'use client'

import { Box, Text, useBreakpointValue  } from '@chakra-ui/react'
import gsap from 'gsap'
import { useRef, useLayoutEffect } from 'react';

export function Headline() {
    const headlineFontSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "5xl" });
    const headlineTop = useBreakpointValue({ base: "32", sm: "36", md: "null"});
    const headlineBottom = useBreakpointValue({ md:"40", lg:"28"});

    const headlineRef = useRef(null);

    useLayoutEffect(() => {
        if(headlineRef.current !== null) {
            const timeline = gsap.timeline({defaults: {duration: 1}})
            timeline.delay(1.2)
            timeline.fromTo(headlineRef.current, {opacity: 0}, {opacity: 1})
            timeline.addPause();
            timeline.play();
        }
    },[])

    return(
        <Box ref={headlineRef} position={'absolute'} top={headlineTop} bottom={headlineBottom} h={'min-content'} w={'full'}>
            <Text
                as={'h2'}
                fontSize={headlineFontSize}
                color={'whiteAlpha.900'}
                fontWeight={'bold'}
                textAlign={'center'}
                fontFamily={'popins'}
            >
                Twist and Turn
            </Text>
        </Box>
    );
}

export function Tagline() {
    const tagLineFontSize = useBreakpointValue({ base: "xl", sm: "2xl" });
    const tagLineBottom = useBreakpointValue({ base: "28", sm: "24", md:"28", lg:"20"});

    const taglineRef = useRef(null);

    useLayoutEffect(() => {
        if(taglineRef.current !== null) {
            const timeline = gsap.timeline({defaults: {duration: 1}})
            timeline.delay(1.8)
            timeline.fromTo(taglineRef.current, {opacity: 0}, {opacity: 1})
            timeline.addPause();
            timeline.play();
        }
    },[])

    return(
        <Box ref={taglineRef} position={'absolute'} bottom={tagLineBottom} w={'full'} justifyContent={'center'} h={'min-content'}>
            <Text
                as={'h2'}
                fontSize={tagLineFontSize}
                color={'whiteAlpha.900'}
                fontWeight={'normal'}
                textAlign={'center'}
                fontFamily={'popins'}
                fontStyle={'italic'}
            >
                The Fascinating Science of Rotational Motion
            </Text>
        </Box>
    );
}