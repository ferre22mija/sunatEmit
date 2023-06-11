import { Box, Button, Center, Divider, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Spacer, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import AddValueAlegra from "./AddValueAlegra";
export default function AddValue() {
    const [value, setValue] = React.useState('1');
    const [typeDni, SetTypeDni] = React.useState('1');
    const [rucDni, SetRucDNi] = React.useState("");
    const [observaciones, SetObservaciones] = React.useState("");
    const [data, setData] = useState([
        { cantidad: 0, precio: 0, subtotal: (0) },
        { cantidad: 0, precio: 0, subtotal: (0) },
        { cantidad: 0, precio: 0, subtotal: (0) },
        { cantidad: 0, precio: 0, subtotal: (0) },
    ])


    return (
        <>
            <Flex m="3">
                <Box textAlign="center">
                    <Center width="50wh">
                        <Text as="b">Ingreso normal</Text>
                    </Center>

                </Box>
                <Spacer />
                <Box>
                    <AddValueAlegra setData={setData}/>
                </Box>
            </Flex>
            <Text as='b'>Tipo de recibo:</Text>
            <RadioGroup onChange={(e) => { setValue(e) }} value={value} align-item="center">
                <Stack direction='row'>
                    <Radio value='1'>Factura</Radio>
                    <Radio value='2'>Boleta</Radio>
                </Stack>
            </RadioGroup>
            <Divider />
            {value == "1" ?
                <>
                    <Text as='b'>Ruc</Text>
                    <NumberInput w="40%" value={rucDni} onChange={(e: any) => { SetRucDNi(e) }}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </>
                :
                <>
                    <RadioGroup onChange={SetTypeDni} value={typeDni}>
                        <Stack direction='row'>
                            <Radio value='1'>DNI:</Radio>
                            <Radio value='2'>RUC</Radio>
                            <Radio value='3'>Sin Documento</Radio>
                        </Stack>
                    </RadioGroup>

                    {typeDni == "1" ?
                        <>
                            <Text as='b'>DNI</Text>
                            <NumberInput value={rucDni} onChange={(e: any) => { SetRucDNi(e) }}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </>
                        :
                        <>
                            {typeDni == "2" ?
                                <>
                                    <Text as='b'>RUC</Text>
                                    <NumberInput value={rucDni} onChange={(e: any) => { SetRucDNi(e) }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </>
                                :
                                <>
                                    <Text as='b'>Sin  documento</Text>
                                    <Input placeholder='Ingrese descripcion' size='sm' value={rucDni} onChange={(e: any) => { SetRucDNi(e.target.value) }} />
                                </>

                            }
                        </>

                    }
                </>
            }

            <Divider />

            <Text as='b'>Observaciones</Text>
            <Input placeholder='Ingrese observaciones' size='sm' value={observaciones} onChange={(e: any) => { SetObservaciones(e.target.value) }} />
            <Divider />

            <TableSheet data={data} setData={setData} />
            <Button colorScheme='teal' size='md' width="100%" onClick={(e: any) => {
                let newData: any = data.filter((ele: any) => { return ele.subtotal > 0 })

                let newRecieve: any = {
                    tipo: value,
                    subtipodni: typeDni,
                    rucDni: rucDni,
                    observaciones: observaciones,
                    productos: newData
                }

                console.log(newRecieve);
                window.electronAPI.setRecieve(newRecieve)
            }}>
                Crear
            </Button>

        </>
    )
}



//TABLA
import {
    DataSheetGrid,
    checkboxColumn,
    textColumn,
    keyColumn,
} from 'react-datasheet-grid'

import 'react-datasheet-grid/dist/style.css'
import AddValueAlegra from "./AddValueAlegra";


const TableSheet = ({ data, setData }: { data: any, setData: any }) => {
    const [total, SetTotal] = useState(0);



    const columns = [
        { ...keyColumn('cantidad', textColumn), title: 'Cantidad', maxWidth: 100 },
        { ...keyColumn('descripcion', textColumn), title: 'Descripcion', maxWidth: 900 },
        { ...keyColumn('precio', textColumn), title: 'Precio ', maxWidth: 100 },
        { ...keyColumn('subtotal', textColumn), title: 'SubTotal', maxWidth: 110, disabled: true },
    ]

    return (
        <>
            <DataSheetGrid
                createRow={() => ({ cantidad: 0, precio: 0 })}
                value={data}
                onChange={(value) => {
                    let newTotal: any = 0
                    value.forEach(element => {
                        element.subtotal = parseFloat(element.cantidad) * parseFloat(element.precio);
                        newTotal = newTotal + parseFloat(element.subtotal);
                    });
                    console.log("valores", value);
                    SetTotal(newTotal);
                    setData(value)
                }}
                columns={columns}
                rowHeight={25}
                stickyRightColumn={{
                    component: ({ deleteRow }) => (
                        <button onClick={deleteRow}>❌</button>
                    ),
                }}
            />
            <Flex alignItems='right' >
                <Spacer />
                <Text as="b" fontSize='3xl'>Total: {total}</Text>

            </Flex>

        </>

    )
}