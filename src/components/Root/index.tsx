import React from "react"
import clsx from "clsx";
import { BsArrowLeft } from 'react-icons/bs';
import { Button } from "@primer/react";
import { useRouter } from "next/router";

interface IRoot {
    children?: React.ReactNode;
    className?: string;
    showBack?: boolean;
}

// TODO: Transparent header

export default function Root({ children, className, showBack }: IRoot) {
    const router = useRouter();
    return (
        <>
            <div data-tauri-drag-region className={"titlebar"} style={{ height: 30 }} />


            <div className={clsx(
                "w-screen h-screen tracking-tighter overflow-auto pl-20 pr-6 py-4 pt-[calc(30px+16px)] text-gray-200 bg-primary-color",
                className
            )}>
                {showBack && (
                    <Button
                        leadingIcon={() => <BsArrowLeft size={18} className="mt-[1px]" />}
                        variant="invisible"
                        size="small"
                        className={`mb-2 -ml-1.5 !pl-1 !pr-2 [&>[data-component="leadingIcon"]]:!mr-1 !text-gray-400 tracking-tight`}
                        onClick={router.back}
                    >
                        BACK
                    </Button>
                )}
                {children}
            </div>
        </>

    )
}