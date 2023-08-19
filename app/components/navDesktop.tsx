'use client'

import NextLink from 'next/link';

import { useBreakpointValue, Box, Button, Flex, Heading, Link,  } from '@chakra-ui/react';

export default function NavbarDesktop() {
    const isSmScreen = useBreakpointValue({ base: true, sm: false })

    return(
        <Box 
            fontFamily={'popins'}
            position={'relative'}
            top={'0'}
            zIndex={'docked'}
            display={isSmScreen ? 'none' : 'block'}
        >
            <Flex 
                w={'90vw'} 
                mx={'auto'} 
                justifyContent={'space-between'} 
                pt={'4'}
            >
                <Flex>
                    <Link 
                        as={NextLink} href='#' 
                        fontFamily={'popins'} 
                        color={'whiteAlpha.900'} 
                        fontSize={'4xl'}
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
                        as={NextLink} href='#' 
                        fontFamily={'popins'} 
                        color={'whiteAlpha.900'}
                        fontSize={'xl'}
                        _hover={
                            {
                                textDecoration: 'none',
                            }}
                    >
                        Explore
                    </Link>
                    <Link
                        as={NextLink} href='#' 
                        fontFamily={'popins'} 
                        color={'whiteAlpha.900'}
                        fontSize={'xl'}
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