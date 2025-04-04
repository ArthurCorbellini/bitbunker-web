import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppHeader } from "./_components/AppHeader";
import { AppSidebar } from "./_components/AppSidebar";
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
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <AppHeader />
                <div className="p-4">
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
