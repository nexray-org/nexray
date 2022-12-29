import { CapturedFetchErrored, CapturedFetchFinished } from "@basis/types";
import clsx from "clsx";
import { Fragment, useContext, useMemo, useState } from "react";
import { UiContext } from "../../../context/UiContext";
import { BiChevronRight } from 'react-icons/bi';
import useAsyncEffect from "use-async-effect";
import DisplayCheck from '../../DisplayCheck';

export default function Requests() {
    const { activeItem } = useContext(UiContext);
    const [itemSizes, setItemSizes] = useState<Record<string, number>>({});

    useAsyncEffect(async isActive => {
        const idToSize: Record<string, number> = {};
        if (activeItem?.fetches) {
            for (const fet of Object.values(activeItem.fetches)) {
                if (fet.response && fet.response.blob) {
                    const currFetBlob = await fet.response.blob();
                    if (currFetBlob) {
                        idToSize[fet.id] = currFetBlob.size;
                    }
                }
            }
        }
        if (!isActive()) {
            return;
        }
        setItemSizes(idToSize)
    }, [])

    function formatBytes(bytes: number, decimals = 2) {
        // https://stackoverflow.com/a/18650828
        if (!+bytes) return '0 Bytes'
    
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    const headerClassName = "px-4 py-2 tracking-wide text-xs font-semibold text-g-primary-300 uppercase";
    const rowClassName = "px-4 py-2 whitespace-nowrap overflow-ellipsis text-sm cursor-pointer transition-colors group-hover:bg-g-primary-700 whitespace-nowrap";

    return (
        <div className='relative'>
            <table className="min-w-full divide-y divide-g-primary-700">
                <thead>
                    <tr>
                        <th scope="col" className={clsx(headerClassName, "text-left")}>URL</th>
                        <th scope="col" className={clsx(headerClassName, "text-center")}>OK</th>
                        <th scope="col" className={clsx(headerClassName, "text-center")}>Type</th>
                        <th scope="col" className={clsx(headerClassName, "text-center")}>Size</th>
                        <th scope="col" className={clsx(headerClassName, "text-right")}></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-g-primary-700">
                    {Object.values(activeItem!.fetches).map(ele => (
                        <Fragment key={ele.id}>
                            <tr className={clsx("group")}>
                                <td className={clsx(rowClassName, "text-left")}>{ele.url}</td>
                                <td className={clsx(rowClassName, "text-center")}>{<DisplayCheck checked={ele.response?.ok || false} className="mx-auto" />}</td>
                                <td className={clsx(rowClassName, "text-center")}>
                                    <div className="flex-center">
                                        <span className="uppercase text-[10px] tracking-wide leading-[10px] font-bold flex-center py-1 px-1.5 bg-g-success-300 text-white rounded-sm">{ele.requestInit?.method || "GET"}</span>
                                    </div>
                                </td>
                                <td className={clsx(rowClassName, "text-center")}>{itemSizes[ele.id] ? formatBytes(itemSizes[ele.id], ) : ""}</td>
                                <td
                                    onClick={() => { }}
                                    className={clsx(rowClassName, "pl-2 pr-0 text-right")}
                                >
                                    <BiChevronRight size={20} className="text-g-success-50 group-hover:text-g-success-100" />
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
            {/* {Object.values(activeItem!.fetches).map(ele => (
                <div key={ele.} className="flex items-center">
                    <span className="text-sm tracking-tight">{ele.url}</span>
                </div>
            ))} */}
        </div>
    )
}