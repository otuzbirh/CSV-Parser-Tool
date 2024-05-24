import { Button } from "@mantine/core";
import { notifications } from '@mantine/notifications';


const ShowJson = ({ data }: { data: Object[] }) => {

    const copyToClipboard = () => {

        navigator.clipboard.writeText(data.map(item => JSON.stringify(item)).join(',\n')).then(() => {
            notifications.show({
                title: 'Success',
                message: 'You successfully copied json! 🤥',
                color: 'green',
            })
        }).catch((err) => {
            notifications.show({
                title: 'Error',
                message: 'Error ocured while copying json! 🤦‍♀️',
                color: 'red',
            })
        });
    };

    const jsonData = data.map((element, index) => {
        return (
            <pre key={index} className="mb-4">
                {JSON.stringify(element, null, 2)},
            </pre>
        );
    });

    return (
        <div className="w-full mt-10 relative">
            <div className='w-full h-[70vh] mt-[20px] overflow-y-auto bg-gray-900 text-yellow-50 px-[30px] py-[20px] rounded-lg'>
                <Button variant="outline" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={copyToClipboard}>Copy</Button>
                {jsonData}
            </div>
        </div>
    );
}

export default ShowJson;
