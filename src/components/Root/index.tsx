import React from "react"
import clsx from "clsx";
import { BsArrowLeft } from 'react-icons/bs';
import { Button } from "@geist-ui/core";
import { useRouter } from "next/router";

interface IRoot {
    children?: React.ReactNode;
    className?: string;
    showBack?: boolean;
}

const defaultStyles = "w-screen h-screen tracking-tighter overflow-auto text-g-primary-50 bg-g-primary-900 box-border"

export default function Root({ children, className, showBack }: IRoot) {
    const router = useRouter();
    return (
        <>
            <div data-tauri-drag-region className={"titlebar"} style={{ height: 28 }} />


            <div className={clsx(
                defaultStyles,
                "pl-20 pr-6 pb-4 pt-[calc(28px+16px)]",
                className
            )}>
                {showBack && (
                    <Button
                        icon={<BsArrowLeft />}
                        auto 
                        scale={0.4}
                        type="default"
                        className={`mb-2 -ml-1.5 !border-none`}
                        pr={0.6}
                        pl={0.3}
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

export function HeadlessRoot({ children, className }: Omit<IRoot, "showBack">) {
    return (
        <>
            <div data-tauri-drag-region className={"titlebar"} style={{ height: 30 }} />


            <div className={clsx(
                defaultStyles,
                "pt-[30px]",
                className
            )}>
                {children}
            </div>
        </>
    )
}