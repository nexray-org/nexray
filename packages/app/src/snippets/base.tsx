import { Code } from '@geist-ui/core';
import clsx from 'clsx';
import { useState } from 'react';
import { PrismLight as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import useAsyncEffect from 'use-async-effect';

export default function rtWrapperBase({ name, ...props }: SyntaxHighlighterProps & { language: 'jsx' | 'tsx'; name?: string }) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useAsyncEffect(async (isActive) => {
        const [{ default: jsx }, { default: tsx }] = await Promise.all([
            import('react-syntax-highlighter/dist/esm/languages/prism/jsx'),
            import('react-syntax-highlighter/dist/esm/languages/prism/tsx'),
        ]);

        SyntaxHighlighter.registerLanguage('jsx', jsx);
        SyntaxHighlighter.registerLanguage('tsx', tsx);
        isActive() && setIsMounted(true);
    }, []);

    return (
        <div className={clsx('[&>div]:!bg-black', name && '[&>div>pre]:pt-2')}>
            <Code block name={name} className='bg-transparent' classic>
                {isMounted && <SyntaxHighlighter showLineNumbers={false} useInlineStyles={false} {...props} />}
            </Code>
        </div>
    );
}
