
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import NavbarUp from './view/NavbarUp.tsx';
import NavbarLeft from './view/NavbarLeft.tsx';

import First from './view/First.tsx';
import CreateRecieve from './view/createrecieve/CreateRecieve.tsx';
import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";
import Configuration from './view/configuration/Configuration.tsx';

function Index() {
    return (
        <>
            <HashRouter>


                <Flex w="100%">
                    <Box w="20%" >
                        <NavbarLeft />
                    </Box>

                    <Box w="80%" >
                        <NavbarUp />

                        <Routes>
                            <Route path="/" element={<First />} ></Route>
                            <Route path="/hola" element={<CreateRecieve />} ></Route>
                            <Route path="/configuracion" element={<Configuration />} ></Route>
                        </Routes>


                    </Box>
                </Flex>
            </HashRouter>
        </>

    )
}
export default Index;

{/* <Flex w="100%">
                        <Box w="20%" >
                            <NavbarLeft />
                        </Box>

                        <Box w="80%" >
                            <NavbarUp />
                        </Box>
            </Flex> */}