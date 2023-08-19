'use client'

import NextLink from 'next/link';
import { useDisclosure, IconButton, Heading, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Link} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const {isOpen, onClose, onOpen, onToggle} = useDisclosure();

    return(
        <>
        <IconButton 
            aria-label="Open Menu"
            icon={<HamburgerIcon/>}
            variant={"outline"}
            onClick={onToggle}
        >
        </IconButton>
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            size={"full"}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    <Link
                        as={NextLink} href='/' 
                        fontFamily={'popins'} 
                    >
                        <Heading as='h1' size='md'>Sphere</Heading>
                    </Link>
                    <DrawerCloseButton 
                        size={'lg'}
                    />
                </DrawerHeader>
                <DrawerBody display={'flex'} flexDir={"column"} mx={'auto'} justifyContent={'center'} gap={'8'}>
                    <Link
                        as={NextLink} href='/' 
                        fontFamily={'popins'} 
                    >
                        <Text>Explore</Text>
                    </Link>
                    <Link
                        as={NextLink} href='/' 
                        fontFamily={'popins'} 
                    >
                        <Text>Create</Text>
                    </Link>
                </DrawerBody>
            </DrawerContent>

        </Drawer>
        </>
    );
}