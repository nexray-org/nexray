import React from 'react';
import clsx from 'clsx';

interface IRoot {
    children?: React.ReactNode;
    className?: string;
}

export default function Root({ children, className }: IRoot) {
    const defaultStyles = 'w-screen h-screen tracking-tighter overflow-auto text-g-primary-50 bg-g-primary-900 box-border';

    return <div className={clsx(defaultStyles, className)}>{children}</div>;
}
