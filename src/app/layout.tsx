import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '../provider/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import NavBar from '@/components/navBar/NavBar';
import dynamic from 'next/dynamic';
import { tree_balls } from '@/constants/algorithmConstants';

const ModalWrapper = dynamic(() => import('@/components/utilComponents/modal/Modal'), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TWL',
  description: 'Today We learned',
  icons: { icon: '/favicon.ico' }
};

console.log('ddd =>', tree_balls[Math.floor(Math.random() * 10)]);

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
            <div className="w-full max-w-[1080px] mx-auto flex flex-col justify-center items-center">{children}</div>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
