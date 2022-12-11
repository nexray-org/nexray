import { Tabs, useTabs } from "@geist-ui/core";
import Output from "./Output";
import CopySnippet from "./Output/CopySnippet";
import Insights from "./Insights";
import { thumbRenderer } from "../QuickList";
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';
import useDeviceSize from "../../hooks/useDeviceSize";

function OverflowHandler(props: ScrollbarProps) {
    const { height } = useDeviceSize();
    // TODO: Exact height of tabs and header
    return (
        <Scrollbars
            style={{ height: height - 90, width: "100%" }}
            renderThumbVertical={thumbRenderer}
            renderThumbHorizontal={thumbRenderer}
            {...props}
        />
    )

}

export default function MainContent() {
    const { bindings } = useTabs('output');
    return (
        <div className="w-full h-full">
            <Tabs {...bindings} hideDivider>
                <Tabs.Item label="Output" value="output">
                    <div className="relative group">
                        <CopySnippet />
                        <OverflowHandler>
                            <Output />
                        </OverflowHandler>
                    </div>
                </Tabs.Item>
                <Tabs.Item label="Insights" value="insights">
                    <OverflowHandler>
                        <Insights />
                    </OverflowHandler>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}