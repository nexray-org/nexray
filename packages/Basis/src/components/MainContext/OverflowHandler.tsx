import { thumbRenderer } from '../QuickList';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';
import useDeviceSize from '../../hooks/useDeviceSize';

export default function OverflowHandler({ marginY, ...props }: ScrollbarProps & { marginY: number }) {
    const { height } = useDeviceSize();
    // TODO: Exact height of tabs and header
    return (
        <Scrollbars
            {...props}
            style={{ height: height - marginY, width: '100%', ...props.style }}
            renderThumbVertical={thumbRenderer}
            renderThumbHorizontal={thumbRenderer}
        />
    );
}
