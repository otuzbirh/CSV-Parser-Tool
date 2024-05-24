import { useEffect, useState } from 'react';
import { Box, Stepper, Button, Group } from '@mantine/core';
import UploadComponent from './../../components/upload-file';
import ShowJson from './../../components/show-json';
import TableComponent from './../../components/table';
import { DataElement } from '@/types/DataElement';


export default function HomeNew() {

    const [data, setData] = useState<DataElement[]>([]);
    const [active, setActive] = useState(0);
    const [disabledNext, setDisabledNext] = useState(true)

    useEffect(() => {
        if (data.length > 0) {
            setDisabledNext(false)
        } else {
            setDisabledNext(true)
        }
    }, [data])


    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));



    return (
        <div className='max-w-5xl min-h-[100vh] flex flex-col justify-space-between mx-auto mt-[40px]'>
            <Stepper active={active} onStepClick={setActive} style={{ minHeight: '600px' }}>
                <Stepper.Step label="First step" description="Upload valid csv file">
                    <UploadComponent dispatch={setData} data={data} />
                </Stepper.Step>
                <Stepper.Step label="Second step" description="Prepare data by editing table">
                    <TableComponent data={data} setData={setData} />
                </Stepper.Step>
                <Stepper.Step label="Final step" description="Copy json and send to you post request" style={{ position: 'relative' }}>
                    <ShowJson data={data} />
                </Stepper.Step>
            </Stepper>

            <Group justify="center" mt="xl">
                <Button variant="default" disabled={active === 0} onClick={prevStep}>Back</Button>
                <Button onClick={nextStep} disabled={disabledNext} >Next step</Button>
            </Group>
        </div>
    );
}