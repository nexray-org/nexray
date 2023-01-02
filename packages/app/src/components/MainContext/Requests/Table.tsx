import clsx from "clsx";
import { Fragment, useContext } from "react";
import { UiContext } from "../../../context/UiContext";
import { BiChevronRight } from 'react-icons/bi';
import DisplayCheck from '../../DisplayCheck';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { thumbRenderer } from '../../QuickList';
import useDeviceSize from "../../../hooks/useDeviceSize";
import { MainContentContext } from "../../../context/MainContentContext";
import { formatBytes } from './utils';

export default function Table() {
    const { activeItem } = useContext(UiContext);
    const { setSelectedRequestForInsightId, setSelectedRequestsTab } = useContext(MainContentContext);

    const headerClassName = "px-4 py-2 tracking-wide text-xs font-semibold text-g-primary-300 uppercase";
    const rowClassName = "px-4 py-2 overflow-ellipsis text-sm cursor-pointer transition-colors group-hover:bg-g-primary-700";

    const { height } = useDeviceSize();

    return (
        <div className='relative'>
            <Scrollbars
                style={{ height: height - 46 - 10 - 30 }}
                renderThumbVertical={thumbRenderer}
                renderThumbHorizontal={thumbRenderer}
                width={200}
            >
                <table className="w-full table-fixed">
                    <thead className="sticky top-0 bg-g-primary-900 after:absolute after:left-0 after:w-full after:border-b after:border-b-g-primary-700">
                        <tr>
                            <th scope="col" colSpan={6} className={clsx(headerClassName, "text-left")}>URL</th>
                            <th scope="col" colSpan={2} className={clsx(headerClassName, "text-center")}>OK</th>
                            <th scope="col" colSpan={2} className={clsx(headerClassName, "text-center")}>Type</th>
                            <th scope="col" colSpan={3} className={clsx(headerClassName, "text-center")}>Size</th>
                            <th scope="col" colSpan={1} className={clsx(headerClassName, "text-right")}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.values(activeItem!.fetches).map(ele => (
                            <Fragment key={ele.id}>
                                <tr className={clsx("group border-b border-b-g-primary-700")} onClick={() => { setSelectedRequestsTab('insights'); setSelectedRequestForInsightId(ele.id); }}>
                                    <td colSpan={6} className={clsx(rowClassName, "text-left whitespace-nowrap overflow-ellipsis overflow-hidden")}>{ele.url}{ele.url}{ele.url}</td>
                                    <td colSpan={2} className={clsx(rowClassName, "text-center")}>{<DisplayCheck checked={ele.response?.ok || false} className="mx-auto" />}</td>
                                    <td colSpan={2} className={clsx(rowClassName, "text-center")}>
                                        <div className="flex-center">
                                            <span className="uppercase text-[10px] tracking-wide leading-[10px] font-bold flex-center py-1 px-1.5 bg-g-success-300 text-white rounded-sm">{ele.requestInit?.method || "GET"}</span>
                                        </div>
                                    </td>
                                    <td colSpan={3} className={clsx(rowClassName, "text-center")}>{ele.response?.size ? formatBytes(ele.response.size) : ""}</td>
                                    <td
                                        onClick={() => { }}
                                        className={clsx(rowClassName, "pl-2 pr-0 text-right")}
                                        colSpan={1}
                                    >
                                        <BiChevronRight size={20} className="text-g-success-50 group-hover:text-g-success-100" />
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </Scrollbars>
        </div>
    )
}