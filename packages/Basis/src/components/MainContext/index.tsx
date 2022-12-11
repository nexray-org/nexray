import { Tabs, useTabs } from '@geist-ui/core';
import Output from './Output';
import Insights from './Insights';

export default function MainContent() {
    const { bindings } = useTabs('output');
    return (
        <div className='w-full h-full'>
            <Tabs {...bindings} hideDivider>
                <Tabs.Item label='Output' value='output'>
                    <Output />
                </Tabs.Item>
                <Tabs.Item label='Insights' value='insights'>
                    <Insights />
                </Tabs.Item>
            </Tabs>
        </div>
    );
}
