'use client'

import { Box, Text, useBreakpointValue  } from '@chakra-ui/react'

export function Headline() {
    const headlineFontSize = useBreakpointValue({ base: "3xl", md: "4xl", lg: "5xl" });
    const headlineTop = useBreakpointValue({ base: "32", sm: "36", md:"auto"});
    const headlineBottom = useBreakpointValue({ md:"40", lg:"28"});
    return(
        <Box position={'absolute'} top={headlineTop} bottom={headlineBottom} h={'min-content'} w={'full'}>
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
    const tagLineBottom = useBreakpointValue({ base: "28", sm: "24", md:"20", lg:"8"});
    return(
        <Box position={'absolute'} bottom={tagLineBottom} w={'full'} display={'flex'} justifyContent={'center'} h={'min-content'}>
            <Text
                w={'80vw'}
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