import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import { ReactPlugin } from "@stagewise-plugins/react";
import "../styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "集换社 PC DEMO",
  description: "A Next.js application supporting multiple regions and languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <StagewiseToolbar
        config={{
          plugins: [ReactPlugin],
        }}
      />
      {children}
    </div>
  );
}
