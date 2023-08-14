'use client'

import { useDisclosure, IconButton, Heading, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'
import {useState} from 'react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
                    <Heading as='h1' size='md'>Sphere</Heading>
                    <DrawerCloseButton 
                        size={'lg'}
                    />
                </DrawerHeader>
                <DrawerBody display={'flex'} flexDir={"column"} mx={'auto'} justifyContent={'center'} gap={'8'}>
                    <Text>Explore</Text>
                    <Text>Create</Text>
                </DrawerBody>
            </DrawerContent>

        </Drawer>
        </>
    );
}