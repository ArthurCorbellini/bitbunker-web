import MainHeader from "@/app/[locale]/_components/main-header/main-header";
import { Toast } from "@/components/toast";
import { Locale, routing } from "@/i18n/routing";
import { ToastContextProvider } from "@/lib/store/toast-context";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitbunker App",
  description: "Bitbunker App",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale))
    notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ToastContextProvider>
            <MainHeader />
            <main className="p-8">
              {children}
            </main>
            <Toast />
          </ToastContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
