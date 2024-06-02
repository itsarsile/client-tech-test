import { AppShell } from '@/components/AppShell';
import '../globals.css';

import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/Providers/theme-providers';
import { Toaster } from '@/components/ui/toaster';

let title = 'Fleetify Test';
export const metadata = {
  title,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <ThemeProvider defaultTheme='light' attribute='class'>
          <AppShell>
            <div className='p-8'>
              {children}
            </div>
          </AppShell>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
