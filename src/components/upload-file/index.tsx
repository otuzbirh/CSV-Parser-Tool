import { useRef, useState } from 'react';
import { Group, Text, rem, Button, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import Papa from 'papaparse';
import fileIcon from './../../assets/file-icon.svg'
import { notifications } from '@mantine/notifications';


export default function UploadComponent({ dispatch, data }: { dispatch: Function, data: Object[] }) {
    const openRef = useRef<() => void>(null);
    const [fileName, setFileName] = useState('');


    const handleFileUpload = (files: File[]) => {
        const file = files[0];
        setFileName(file.name);
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    notifications.show({
                        title: 'Success',
                        message: 'You successfully uploaded csv file!',
                        color: 'green',
                    })
                    dispatch(results.data);
                },
            });
        }
    };

    return (
        <>
            {
                data?.length > 0 && fileName !== '' ?
                    <Group justify='start' mt={50}>
                        <img src={fileIcon} height={50} width={50} alt="file-icon" />
                        <p>{fileName}</p>
                    </Group> : null
            }
            <Dropzone
                onDrop={handleFileUpload}
                onReject={() => notifications.show({
                    title: 'Error',
                    message: 'Error ocured while uploading csv file!',
                    color: 'red',
                })}
                maxSize={5 * 1024 ** 2}
                accept={["text/csv"]}
                mt={data.length > 0 ? 60 : 160}
                openRef={openRef}
            >
                <Group justify="center" gap="xl" mih={220} style={{
                    pointerEvents: 'none', border: '1px dashed gray', borderRadius: '10px'
                }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Group justify="center" mt="md">
                <Button onClick={() => openRef.current?.()}>Select files</Button>
            </Group>
        </>
    );
}
