import type { Metadata } from "next";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "@fontsource/inter";
import "@fontsource/roboto";
import "@fontsource/fira-code";
import "@fontsource/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitFusion - Personal Trainer IA",
  description: "Transforme seu corpo, transforme sua vida. Treinos personalizados, nutrição balanceada e personal trainer IA 24/7.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FitFusion",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  themeColor: "#10b981",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FitFusion" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
