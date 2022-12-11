import Link, { LinkProps } from "next/link"
import React from "react"

interface IFlexibleLink extends LinkProps {
    children: React.ReactElement | React.ReactElement[];
    disabled?: boolean;
}

export default function FlexibleLink({ children, disabled, ...props }: IFlexibleLink) {
    const SafeLink = disabled ? 'div' : Link;
    
    return (
        <SafeLink {...props}>
            {children}
        </SafeLink>
    )
}