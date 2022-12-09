import type { AppProps } from "next/app";
import "../style.css";
import { ThemeProvider, theme } from '@primer/react';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme} colorMode="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
