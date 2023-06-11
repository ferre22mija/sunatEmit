import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { SunIcon,DeleteIcon,SettingsIcon } from '@chakra-ui/icons'

function NavbarLeft() {
  return (
    <>
      <Box boxShadow="md" w="100%" h="100vh" bg="rgb(0, 177, 157)" color="white">

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left' >

                  Emitir con API
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p="0px">
              <Box display="flex" py={2} pl="15px" _hover={{ background: "white", color: "teal.500", }}>
                
                
                <Link to={'/hola'}><Text> <SunIcon /> Crear Recibo Electronico</Text></Link>
              </Box>
              <Box display="flex" py={2} pl="15px" _hover={{ background: "white", color: "teal.500", }}>
                <Text><DeleteIcon/> Anular Electrónico</Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>
          <Box display="flex" py={2} pl="3px" _hover={{ background: "white", color: "teal.500", }}>
          <Link to={'/configuracion'}><Text> <SettingsIcon/> Configuracion</Text></Link>
          </Box>
        </Accordion>

      </Box>
    </>
  )
}
export default NavbarLeft;