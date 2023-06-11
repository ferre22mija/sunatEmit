import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
const options = {
    method: 'GET',
    headers: {
        "Content-Security-Policy":"default-src 'self'",
        accept: 'application/json',
        authorization: 'Basic ZmVycmV0ZXJpYWNlcmFtaWNhc21pamFyZXNAZ21haWwuY29tOjBjNzE0YTRjNjE0MGJkYjdhYzg1'
    }
};
export default function AddValueAlegra({setData}:{setData:any}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ventasAlegra, SetVentasAlegra] = useState([])
    const [statusSkeleton, SetStatusSkeleton] = useState(0);
    const [ventaSelecta,SetVentaSelecta] = useState({});
    const btnRef = React.useRef()
    async function CargarDatos() {
        SetStatusSkeleton(1);
        SetVentasAlegra([]);
        const ventas = await window.electronAPI.setTitle("HOLA") //jala de alegra
        SetStatusSkeleton(0);
        console.log(ventas);
        SetVentasAlegra(ventas);
    }
    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Jalar de Alegra
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'lg'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Jalar datos de alegra</DrawerHeader>

                    <DrawerBody>
                        <Button colorScheme="teal" onClick={CargarDatos}>Cargar</Button>
                        <Text>Ultimas facturas</Text>
                        <Tabla ventas={ventasAlegra} statusSkeleton={statusSkeleton} SetVentaSelecta={SetVentaSelecta}/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue' onClick={()=>{
                            console.log(ventaSelecta);
                            let newVentaSelecta:any[] = []
                            ventaSelecta.items.forEach((element:any) => {
                                let item:any = {
                                    cantidad:element.quantity,
                                    descripcion:element.name,
                                    precio:element.price,
                                    subtotal:element.total
                                }
                                newVentaSelecta.push(item);
                            });
                            console.log(newVentaSelecta);
                            setData(newVentaSelecta);
                            onClose();
                        }}>Jalar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
const Tabla = ({ventas = [], statusSkeleton=0, SetVentaSelecta}:{ventas:any,statusSkeleton:number,SetVentaSelecta:any}) => {
    let num = 0;
    function Seleccionar(e:any,venta:any){
        let parent = e.target.parentElement;
        
        let parentParent = parent.parentElement.childNodes;
        parentParent.forEach((element:any) => {
            element.style.background = "white";
            element.style.color = "#0f172a";
        });

        parent.style.background = "#00b19d";
        parent.style.color = "white";
        SetVentaSelecta(venta);
    }
    return (
        <TableContainer>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Fecha</Th>
                        <Th >Cliente</Th>
                        <Th >Monto</Th>
                    </Tr>
                </Thead>
                <Tbody cursor={"default"}>
                    { 
                        ventas.map((venta:any)=>{
                            num = num +1;
                            return <Tr key={venta.id}  onClick={(e)=>{
                                Seleccionar(e,venta);
                            }}>
                            <Td>{num}</Td>
                            <Td>{venta.datetime}</Td>
                            <Td>{venta.client.name}</Td>
                            <Td isNumeric>{venta.total}</Td>
                        </Tr>
                        })
                    }
                    

                </Tbody>
                
            </Table>
            {statusSkeleton == 1 ? 
                    <Stack >
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                  </Stack>:<></>

                    }
        </TableContainer>
    )
}