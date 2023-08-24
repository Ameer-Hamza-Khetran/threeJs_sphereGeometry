'use client'

import NextLink from 'next/link';
import { gsap } from "gsap";
import { useBreakpointValue, Box, Button, Flex, Heading, Link, Portal, } from '@chakra-ui/react';
import { useLayoutEffect, useRef, useState } from 'react';

export default function NavbarDesktop() {

    const isSmScreen = useBreakpointValue({ base: true, sm: false });
    const sphereFontSize = useBreakpointValue({base: '4xl'});
    const linksFontSize = useBreakpointValue({base: 'xl'});
    // const navbarRef = useRef(null)

    useLayoutEffect(() => {
        // if (navbarRef.current !== null) {
        //     const timeline = gsap.timeline({ defaults: { duration: 1 } });

        //     timeline.delay(0.8);
        //     timeline.fromTo(navbarRef.current, { y: -100 }, { y: 0 });
        //     timeline.addPause();
        //     timeline.play();
        // }
    }, []);

    return (
        <Box
            // ref={navbarRef}
            fontFamily={'popins'}
            position={'absolute'}
            top={'0'}
            width={'full'}
            // zIndex={'docked'}
            display={isSmScreen ? 'none' : 'flex'}
            // mx={'auto'}
        >
            <Flex
                w={'full'}
                // mx={'auto'}
                justifyContent={'space-between'}
                pt={'4'}
                px={'8'}
            >
                <Flex>
                    <Link
                        as={NextLink} href='/'
                        fontFamily={'popins'}
                        color={'whiteAlpha.900'}
                        fontSize={sphereFontSize}
                        _hover={
                            {
                                textDecoration: 'none',
                            }}
                        // ml={'4'}
                    >
                        Sphere
                    </Link>
                </Flex>
                <Flex
                    gap={'20'}
                    alignItems={'center'}
                >
                    <Link
                        as={NextLink} href='/'
                        fontFamily={'popins'}
                        color={'whiteAlpha.800'}
                        fontSize={linksFontSize}
                        _hover={
                            {
                                textDecoration: 'none',
                            }}
                    >
                        Explore
                    </Link>
                    <Link
                        as={NextLink} href='/'
                        fontFamily={'popins'}
                        color={'whiteAlpha.800'}
                        fontSize={linksFontSize}
                        _hover={
                            {
                                textDecoration: 'none',
                            }}
                    >
                        Create
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
}