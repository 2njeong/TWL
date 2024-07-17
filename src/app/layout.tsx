import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '../provider/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import Modal from '@/components/utilComponents/modal/Modal';
import NavBar from '@/components/navBar/NavBar';
import dynamic from 'next/dynamic';

const ModalWrapper = dynamic(() => import('@/components/utilComponents/modal/Modal'), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Provider>
            <div id="root"></div>
            <ModalWrapper />
            <NavBar />
            <div className="w-full max-w-[1080px] h-[calc(100vh-5rem)] mx-auto flex flex-col justify-center items-center">
              {children}
            </div>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
