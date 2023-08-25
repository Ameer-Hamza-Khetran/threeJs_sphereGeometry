'use client'

import NextLink from 'next/link';
import { gsap } from "gsap";
import { useBreakpointValue, Box, Flex, Link } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';

export default function NavbarDesktop() {

    const isSmScreen = useBreakpointValue({ base: true, sm: false });
    const sphereFontSize = useBreakpointValue({base: '4xl', lg: '5xl'});
    const linksFontSize = useBreakpointValue({base: 'xl', lg:'2xl'});
    const navbarRef = useRef(null)

    useLayoutEffect(() => {
        if (navbarRef.current !== null) {
            const timeline = gsap.timeline({ defaults: { duration: 1 } });

            timeline.delay(0.8);
            timeline.fromTo(navbarRef.current, { y: -100 }, { y: 0 });
            timeline.addPause();
            timeline.play();
        }
    }, []);

    return (
        <Box 
            ref={navbarRef}
            fontFamily={'popins'}
            position={'absolute'}
            top={'0'}
            width={'full'}
            display={isSmScreen ? 'none' : 'flex'}
        >
            <Flex
                w={'full'}
                justifyContent={'space-between'}
                pt={'4'}
                px={{base:'8',lg: '16', xl: '24'}}
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