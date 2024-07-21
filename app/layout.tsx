import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";
import Provider from "@/app/Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LiveDocs",
  description: "Your go-to collaborative editor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#3371FF", fontSize: "16px" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
          <Provider>{children}</Provider> {/* liveblocks provider */}
        </body>
      </html>
    </ClerkProvider>
  );
}