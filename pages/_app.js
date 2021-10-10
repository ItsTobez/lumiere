import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import '@styles/globals.css';

export default function ProjectLumiere({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <ThemeProvider forcedTheme={Component.theme || null} attribute='class'>
        <NextNProgress color='#3e73ea' options={{ showSpinner: false }} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SessionProvider>
  );
}
