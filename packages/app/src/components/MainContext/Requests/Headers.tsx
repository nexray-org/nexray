import MonacoWrapper from "../MonacoWrapper";
import { Allotment } from "allotment";
import { useContext } from "react";
import { UiContext } from "../../../context/UiContext";

interface IHeaders {
    request: Record<string, string> | undefined;
    response: Record<string, string> | undefined;
}

const SectionHeader = ({ children }: { children: string; }) => <div className="h-[28px] flex items-center pl-4 border-b border-b-g-primary-700"><span className="leading-none text-xs tracking-normal text-g-primary-300 font-semibold">{children}</span></div>;

export default function Headers({ request, response }: IHeaders) {
    const { config } = useContext(UiContext);

    return (
        <div style={{ height: `calc(100vh - 88px)` }}>
            <Allotment>
                <Allotment.Pane preferredSize={"50%"} minSize={0}>
                    <SectionHeader>Request Headers</SectionHeader>
                    <MonacoWrapper
                        height={`calc(100vh - 88px - 28px)`}
                        disableFind
                        language='json'
                        value={request ? JSON.stringify(request, null, 2) : ""}
                        options={{
                            minimap: { enabled: false },
                            padding: { top: 0, bottom: 33 },
                            fontSize: config.get('insightsFontSize'),
                            wordWrap: config.get('insightsWordWrapEnabled') ? 'on' : 'off',
                            lineNumbers: 'off',
                        }}
                    />
                </Allotment.Pane>
                <Allotment.Pane preferredSize={"50%"} minSize={0}>
                    <SectionHeader>Response Headers</SectionHeader>
                    <MonacoWrapper
                        height={`calc(100vh - 88px - 28px)`}
                        disableFind
                        language='json'
                        value={response ? JSON.stringify(response, null, 2) : ""}
                        options={{
                            minimap: { enabled: false },
                            padding: { top: 0, bottom: 33 },
                            fontSize: config.get('insightsFontSize'),
                            wordWrap: config.get('insightsWordWrapEnabled') ? 'on' : 'off',
                            lineNumbers: 'off',
                        }}
                    />
                </Allotment.Pane>
            </Allotment>
        </div>
    )
}