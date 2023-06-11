import React from "react";
import { Box } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
function NavbarUp() {
    return (
        <>
            <Box bg='white' w='100%' color='black' py="30px" boxShadow='md'>
                <Flex>
                    <Text fontSize='2xl' ml="10px"> Sunat Connection</Text>
                    <Spacer />
                </Flex>
            </Box>
        </>
    )

}
export default NavbarUp;
