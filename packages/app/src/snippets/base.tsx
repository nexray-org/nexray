import { Code } from '@geist-ui/core'
import clsx from 'clsx';
import { PrismLight as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);

export default function rtWrapperBase({name, ...props}: SyntaxHighlighterProps & { language: "jsx" | "tsx"; name?: string; }) {

    return (
        <div className={clsx("[&>div]:!bg-black", name && "[&>div>pre]:pt-2")}>
            <Code block name={name} className="bg-transparent" classic>
                <SyntaxHighlighter showLineNumbers={false} useInlineStyles={false} {...props} />
            </Code>
        </div>
    )
}