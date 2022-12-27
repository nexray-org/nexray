import { ChildProps } from "@basis/types";
import useDeviceSize from "../../../hooks/useDeviceSize";
import MonacoWrapper from '../MonacoWrapper';
import Image from "next/image";

interface IKeyValue {
    itemProps: Omit<ChildProps, "children"> | undefined;
}

export default function KeyValue({ itemProps }: IKeyValue) {
    const { height } = useDeviceSize();

    if (Object.keys(itemProps || {}).length === 0) {
        return (
            <div className='flex-center flex-col text-center w-full h-full pb-[10vh] pointer-events-none select-none'>
                <div className='max-w-[100px] brightness-[0.25]'>
                    <Image src={require('../../../assets/cup.png')} />
                </div>
                <span className='text-g-primary-600 font-semibold text-sm mt-3'>No props passed to this component</span>
            </div>
        )
    } else {
        return (
            <MonacoWrapper
                height={height - 30 - 46 - 4 - 4 - 11 - 71}
                language='json'
                disableFind
                value={JSON.stringify(itemProps, null, 2)}
                options={{
                    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html#emptySelectionClipboard
                    readOnly: true,
                    minimap: { enabled: false },
                    padding: { top: 10, bottom: 10 },
                    domReadOnly: true,
                    fontSize: 12,
                    lightbulb: {
                        enabled: false,
                    },
                    wordWrap: 'on',
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    scrollbar: {
                        useShadows: false,
                    },
                    contextmenu: false,
                    find: {
                        // https://github.com/microsoft/vscode/issues/28390#issuecomment-470797061
                        addExtraSpaceOnTop: false,
                    },
                    renderWhitespace: 'none',
                    showFoldingControls: 'always',
                    links: false,
                }}
            />
        )
    }
}