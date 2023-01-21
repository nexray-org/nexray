import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export default function TabChin(props: ComponentPropsWithoutRef<'div'>) {
    return (
        <div 
            {...props} 
            className={clsx(
                'h-[43px] border-b border-b-gray-700 w-full flex items-center space-x-3 pl-3 pb-0.5', 
                props.className
            )} 
        />
    )
}