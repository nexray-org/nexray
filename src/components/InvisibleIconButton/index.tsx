import { Button, ButtonProps } from "@primer/react";
import clsx from "clsx";
import { forwardRef } from "react";
import { IconType, IconBaseProps } from "react-icons";
import tailwindColor from 'tailwindcss/colors';

interface IInvisibleIconButton {
    Icon: IconType
    iconProps?: IconBaseProps;
    iconSize: "xs" | "sm" | "lg";
    className?: string;
    sx?: Record<string, any>
    onClick?: ButtonProps['onClick'];
}

const InvisibleIconButton = forwardRef<HTMLButtonElement, IInvisibleIconButton>(function InvisibleIconButtonRef({
    Icon, 
    iconProps, 
    className, 
    iconSize, 
    sx, 
    ...props
}, ref) {
    function getRootHeight() {
        switch (iconSize) {
            case "xs":
                return 22;
            case "sm":
                return 28;
            case "lg":
                return 40;
            default:
                return 0;
        }
    }

    function getFontSize() {
        switch (iconSize) {
            case "xs":
                return 14;
            case "sm":
                return 14;
            case "lg":
                return 18;
            default:
                return 0;
        }
    }

    return (
        <Button
            className={clsx('flex-center button-ring !rounded-full !p-0', className)}
            sx={{
                background: "transparent",
                height: getRootHeight(),
                width: getRootHeight(),
                borderColor: "transparent",
                boxShadow: "none",
                ...sx
            }}
            as={"button"}
            ref={ref}
            {...props}
        >
            <Icon fontSize={getFontSize()} color={tailwindColor.slate[600]} {...iconProps} />
        </Button>
    )
})

export default InvisibleIconButton;
