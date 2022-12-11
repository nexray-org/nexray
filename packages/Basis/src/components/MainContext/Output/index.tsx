import { useContext } from 'react';
import { UiContext } from '../../../context/UiContext';
import Highlight, { defaultProps } from 'prism-react-renderer';
import clsx from 'clsx';
import prismStyle from './prismStyle';
import OverflowHandler from '../OverflowHandler';
import ControlSnippet from './ControlSnippet';
import OutputSearch from './OutputSearch';

export default function Output() {
    const { data, selectedCategoryId } = useContext(UiContext);
    const item = data.find((ele) => ele.id === selectedCategoryId)!;

    return (
        <div className='relative group'>
            <ControlSnippet />
            <OverflowHandler marginY={125} className="[&>div]:!mr-[-17px]">
                <Highlight {...defaultProps} code={item.contents} language={'log' as any} theme={prismStyle}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={clsx(className, 'px-3 py-0 m-0 h-full overflow-auto whitespace-pre-line !border-none rounded-none')} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </OverflowHandler>
            <OutputSearch />
        </div>
    );
}
