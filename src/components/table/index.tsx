import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Table, Pagination, TextInput, Button, Select } from '@mantine/core';
import { DataElement } from '@/types/DataElement';
import { IconTrash, IconTool, IconDeviceFloppy } from '@tabler/icons-react';


interface TableComponentProps {
    data: DataElement[];
    setData: Dispatch<SetStateAction<DataElement[]>>;
}

export default function TableComponent({ data, setData }: TableComponentProps) {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [activePage, setPage] = useState(1);
    const [tableData, setTableData] = useState(data?.slice(0, 20));
    const [columnNames, setColumnNames] = useState(Object.keys(data[0] || {}));
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setTableData(data?.slice((activePage - 1) * 20, activePage * 20));
    }, [activePage, data]);

    const totalPages = Math.ceil(data.length / 20);

    const handleColumnNameChange = (index: number, newName: string | null) => {
        const updatedColumnNames = [...columnNames];
        if (typeof newName === 'string')
            updatedColumnNames[index] = newName;
        setColumnNames(updatedColumnNames);
    };

    const updateDataWithNewColumnNames = () => {
        const updatedData = data.map(row => {
            const newRow: DataElement = {};
            Object.keys(row).forEach((key, index) => {
                newRow[columnNames[index]] = row[key];
            });
            return newRow;
        });
        setData(updatedData);
        setEditMode(false);
    };

    const removeColumn = (index: number) => {
        const updatedColumnNames = columnNames.filter((_, colIndex) => colIndex !== index);
        setColumnNames(updatedColumnNames);

        const updatedData = data.map(row => {
            const newRow: DataElement = {};
            updatedColumnNames.forEach(col => {
                newRow[col] = row[col];
            });
            return newRow;
        });
        setData(updatedData);
    };


    const rows = tableData.map((element: DataElement, position) => {
        return (
            <Table.Tr
                key={position}
                style={{ backgroundColor: selectedRows.includes(position) ? 'var(--mantine-color-blue-light)' : undefined }}
            >
                {columnNames.map((key: string, index) => (
                    <Table.Td key={index}>{element.hasOwnProperty(key) ? element[key] : ''}</Table.Td>
                ))}
            </Table.Tr>
        );
    });

    return (
        <>
            <Button
                rightSection={editMode ? <IconDeviceFloppy stroke={1} /> : <IconTool stroke={1} />}
                onClick={() => {
                    if (editMode) {
                        updateDataWithNewColumnNames();
                    } else {
                        setEditMode(true);
                    }
                }} mt="md">
                {editMode ? 'Save Column Names' : 'Edit Column Names'}
            </Button>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        {columnNames.map((key, index) => (
                            <Table.Th key={index}>
                                {editMode ? (
                                    <>
                                        <Button leftSection={<IconTrash stroke={1} />} onClick={() => removeColumn(index)} variant="default" mb={20}>Delete</Button>
                                        <Select
                                            data={['order_id', 'phone_number', 'first_name', 'last_name', 'email', 'address', 'country_code', 'city', 'zip_code', 'ip_address', 'ip_country_code', 'ip_country_name']}
                                            value={key}
                                            onChange={(option) => handleColumnNameChange(index, option)}
                                            searchable
                                        />
                                    </>
                                ) : (key)}
                            </Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <Pagination
                total={totalPages}
                value={activePage}
                onChange={setPage}
                style={{ display: 'flex', justifyContent: 'center' }}
                mt="sm"
            />
        </>
    );
}
