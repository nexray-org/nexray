import { ChildProps } from '@nexray/types';
import useDeviceSize from '../../../hooks/useDeviceSize';
import MonacoWrapper from '../MonacoWrapper';
import Image from 'next/image';

interface IKeyValue {
    itemProps: Omit<ChildProps, 'children'> | undefined;
}

export default function KeyValue({ itemProps }: IKeyValue) {
    const { height } = useDeviceSize();

    if (Object.keys(itemProps || {}).length === 0) {
        return (
            <div className='flex-center flex-col text-center w-full h-full pb-[10vh] pointer-events-none select-none'>
                <div className='max-w-[100px] brightness-[0.25]'>
                    <Image src={require('../../../assets/cup.png')} />
                </div>
                <span className='text-g-primary-600 font-semibold text-sm mt-3'>No props passed to this component</span>
            </div>
        );
    } else {
        return (
            <MonacoWrapper
                height={height - 46 - 4 - 4 - 11 - 63}
                language='json'
                disableFind
                value={JSON.stringify(itemProps, null, 2)}
                options={{
                    minimap: { enabled: false },
                    padding: { top: 10, bottom: 10 },
                    fontSize: 12,
                    wordWrap: 'on',
                    lineNumbers: 'off',
                    showFoldingControls: 'always',
                }}
            />
        );
    }
}
