import clsx from "clsx";
import dayjs from "dayjs";
import { useContext } from "react";
import { FixedSizeListProps } from "react-window"
import { UiContext } from "../../context/UiContext";

export const itemSize = 140;

export const CategoryListButton: FixedSizeListProps<undefined>['children'] = ({ index, style }) => {
    const { selectedCategoryId, data } = useContext(UiContext);
    const item = data[index] || { id: undefined };

    return (
        <div
            style={style}
            className={clsx(
                "px-2 border-b border-b-g-primary-800 transition-colors hover:bg-g-primary-800",
                "cursor-pointer",
                selectedCategoryId === item.id && "bg-g-primary-800"
            )}
        >
            <div className='flex items-center'>
                <span className='text-gray-300 text-sm font-semibold'>{item.type}</span>
                <div className='rounded leading-none px-2 py-1 text-xs bg-g-primary-800 text-g-primary-600'>{item.status.code} {item.status.reason}</div>
            </div>
            <span className='text-xl text-gray-600 font-semibold'>{item.url}</span>
            <span className='text-xs text-gray-800'>{item.contents}{String.fromCharCode(8230)}</span>
            <span className='text-xs text-gray-800'>{dayjs(item.timestamp).format("MMMM D, YYYY h:mm:ss A")}</span>
            <div className="flex items-center">
                <span className="text-[7px]">{item.durationMs} MS</span>
                <span className="text-[7px]">{item.payloadSizeBytes} Bytes</span>
            </div>
        </div>
    )
}