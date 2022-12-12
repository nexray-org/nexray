import { useState } from "react";
import { Input, InputProps } from '@geist-ui/core';
import numbro from "numbro";

type ControlledRowNumberInputProps =
    | {
        fallback: number | undefined;
        value: number | undefined;
        onChange: (value: number | undefined) => any;
    }
    | {
        value: number;
        fallback: number;
        onChange: (value: number) => any;
    };

type INumberInput = Omit<InputProps, 'value' | 'onChange'> & ControlledRowNumberInputProps;

export default function NumberInput({ fallback, value, onChange, ...props }: INumberInput) {
    const [isShowDot, setIsShowDot] = useState<boolean>(false);

    function onChangeWrapper(text: string) {
        console.log("RAW TEXT", text)
        const cleanedText = text.replace(/[^0-9.]+/g, '');

        if (cleanedText.endsWith('.')) {
            if (cleanedText.indexOf('.') === cleanedText.length - 1) {
                setIsShowDot(true);
            }
            return;
        } else {
            setIsShowDot(false);
        }

        if (cleanedText !== '' && cleanedText !== undefined) {
            onChange(numbro.unformat(cleanedText));
        } else {
            onChange(fallback as any);
        }
    }

    return (
        <Input
            value={`${value === undefined ? '' : numbro(value).format({ thousandSeparated: true })}${isShowDot ? '.' : ''}`}
            onChange={e => onChangeWrapper(e.target.value)}
            onKeyDown={({ nativeEvent: { key } }) => {
                if (key === 'Backspace') {
                    setIsShowDot(false);
                    const numStr = '' + value;
                    if (numStr.length >= 2 && numStr.charAt(numStr.length - 2) === '.') {
                        onChange(Math.floor(value!));
                    }
                }
            }}
            inputMode="numeric"
            // htmlType="number" DON'T DO THIS!
            {...props}
        />
    )
}