'use client'

import { useBreakpointValue, Box, Button, Flex, Heading } from '@chakra-ui/react';

export default function NavbarDesktop() {
    const isSmScreen = useBreakpointValue({ base: true, sm: false })

    return(
        <Box 
            fontFamily={'popins'}
            position={'relative'}
            top={'0'}
            zIndex={'1'}
            display={isSmScreen ? 'none' : 'block'}
        >
            <Flex 
                w={'90vw'} 
                mx={'auto'} 
                justifyContent={'space-between'} 
                pt={'4'}
            >
                <Flex>
                    <Button 
                        p={'0'} 
                        bg={'none'}
                    >
                        <Heading 
                            as={'h1'} 
                            fontFamily={'popins'} 
                            color={'whiteAlpha.900'}
                        >
                            Sphere
                        </Heading>
                    </Button>
                </Flex>
                <Flex 
                    gap={'20'}
                >
                    <Button 
                        p={'0'} 
                        bg={'none'} 
                        color={'whiteAlpha.900'}
                    >
                        Explore
                    </Button>
                    <Button 
                        p={'0'} 
                        bg={'none'} 
                        color={'whiteAlpha.900'}
                    >
                        Create
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}