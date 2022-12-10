import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import "../style.css";

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}
