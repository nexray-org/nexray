import type { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { UiProvider } from '../context/UiContext';
import { ApiProvider } from '../context/ApiContext';
import '../style.css';
import '../monaco.css';
import '../prism.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GeistProvider themeType='dark'>
            <CssBaseline />
            <UiProvider>
                <ApiProvider>
                    <Component {...pageProps} />
                </ApiProvider>
            </UiProvider>
        </GeistProvider>
    );
}
