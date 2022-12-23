import { Allotment } from "allotment";
import clsx from "clsx";
import { Fragment, useContext } from "react";
import { MainContentContext } from "../../../context/MainContentContext";
import { UiContext } from "../../../context/UiContext";

export default function Requests() {
    const { activeItem } = useContext(UiContext);
    return (
        <div className='relative'>
            <table className="min-w-full divide-y divide-g-primary-700">
                <thead className="bg-g-primary-500">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase">URL</th>
                        <th scope="col" className="px-6 py-3 text-right text-sm font-medium uppercase">Status</th>
                        <th scope="col" className="px-6 py-3 text-right text-sm font-medium uppercase">Size</th>
                        <th scope="col" className="px-6 py-3 text-right text-sm font-medium uppercase"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-g-primary-700">
                    {/* {Object.values(activeItem!.fetches).map(ele => (
                        <Fragment key={ele.id}>
                            <tr className={clsx("group", expandedRows[ele[0]] ? "h-[150px]" : "")}>
                                
                            </tr>
                        </Fragment>
                    ))} */}
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