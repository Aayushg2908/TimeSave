import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TimeSave",
  description: "Deep work planner for your daily time saving.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <NextTopLoader color="#52a447" />
          <Toaster richColors />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
