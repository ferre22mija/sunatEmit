import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
export default function Configuration() {
    const [usuario, SetUsuario] = useState("");
    const [token, SetToken] = useState("");
    const [editado, SetEditado] = useState(false);

    async function getConfiguration(){
        const configuracion = await window.electronAPI.getConfiguration();
        console.log(configuracion);
        SetUsuario(configuracion.usuario);
        SetToken(configuracion.token);
    }
    getConfiguration();
    function setConfiguration(usuario:string, token:string){
        SetUsuario("hola");
        SetToken("nel");
    }
    return (
        <>
            <Box boxShadow="md" p="4" m="4">
                <Text as="b" > Configuracion Alegra</Text>
                <Divider />
                <Box>

                    {editado ? <EditAlegra SetEditado={SetEditado} usuario={usuario} token={token} setConfiguration={setConfiguration}/> : <>
                        <Text> <b>Usuario:</b> {usuario} </Text>
                        <Text> <b>Token:</b> {token}</Text>
                        <Button colorScheme='blue' onClick={() => { SetEditado(true) }}>Editar</Button>
                    </>}

                </Box>

            </Box>
        </>
    )
}

const EditAlegra = ({ usuario = "", token = "", SetEditado, setConfiguration }: { setConfiguration :any,SetEditado: any, usuario: string, token: string }) => {
    const [newusuario, SetnewUsuario] = useState(usuario);
    const [newtoken, SetnewToken] = useState(token);
    async function editar(){
        SetEditado(false)
        window.electronAPI.setConfiguration({"usuario":newusuario,"token":newtoken})
        setConfiguration("","");
    }   
    return (
        <FormControl >
            <FormLabel>Usuario</FormLabel>
            <Input type='text' value={newusuario} onChange={(e) => { SetnewUsuario(e.target.value) }} />
            <FormHelperText>Ingrese su usuario</FormHelperText>
            <FormLabel>Token</FormLabel>
            <Input type='text' value={newtoken}onChange={(e) => { SetnewToken(e.target.value) }} />
            <FormHelperText>Ingrese el token</FormHelperText>
            <Button colorScheme='blue' onClick={() => { editar() }}>Guardar</Button>
        </FormControl>
    )
}