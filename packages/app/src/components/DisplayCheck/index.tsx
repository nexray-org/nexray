import { FaCheck, FaPlus } from 'react-icons/fa';
import clsx from 'clsx';

interface IDisplayCheck {
    checked: boolean;
    className?: string;
}

export default function DisplayCheck({ checked, className }: IDisplayCheck) {
    const rootClassName = "rounded-full border flex-center h-[14px] w-[14px]";
    if (checked) {
        return (
            <div className={clsx(rootClassName, "border-g-success-200 bg-g-success-200", className)}><FaCheck fontSize={8} color="#ffffff" /></div>
        )
    } else {
        return (
            <div className={clsx(rootClassName, "border-g-error-100", className)} />
        )
    }
}