import './globals.css';
import basicMetadata from '@/util/metadata';
import UIProvider from './providers/next-ui';
import { Toaster } from 'sonner';
import { UserContextProvider } from './context/UserContext';

export const metadata = basicMetadata();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors />
        <UIProvider>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </UIProvider>
      </body>
    </html>
  )
}
