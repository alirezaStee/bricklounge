import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Header from './components/layout/Header';
import Brand from './components/shared/Brand';
import localFont from 'next/font/local';
import { CategoryProvider } from './contexts/CategoryContext';
import CartContextProvider from './contexts/CartContext';
import QueryProvider from './contexts/QueryProvider';

const dana = localFont({
  src: [
    {
      path: './fonts/dana/dana thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana extralight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana demibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana extrabold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/dana/dana black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-dana',
});

export const metadata: Metadata = {
  title: 'Brick lounge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${dana.className} flex min-h-screen items-center justify-center antialiased`}
      >
        <QueryProvider>
          <CategoryProvider>
            <CartContextProvider>
              <div className="flex min-h-screen w-full max-w-[700px] flex-col items-center justify-between bg-white">
                <Header />
                <Brand />
                {children}
              </div>
            </CartContextProvider>
          </CategoryProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
