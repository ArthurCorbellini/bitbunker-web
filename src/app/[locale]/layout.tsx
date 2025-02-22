import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";

import { Toast } from "@/components/legacy/toast";
import { ToastContextProvider } from "@/lib/store/toast-context";
import MainHeader from "./_components/main-header/main-header";
import "./globals.css";

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
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <ToastContextProvider>
              <MainHeader />
              <main className="p-8">
                {children}
              </main>
              <Toast />
            </ToastContextProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
