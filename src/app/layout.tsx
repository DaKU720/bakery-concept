import type { Metadata, Viewport } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Footer } from "@/components/Footer";
import { WelcomeModal } from "@/components/WelcomeModal";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "latin-ext"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
});

export const viewport: Viewport = {
  themeColor: "#E88D96",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Cukiernia \"Słodka Ola\" - Tradycyjne Wypieki i Desery",
  description: "Masz smaka na coś pysznego? Cukiernia 'Słodka Ola' zaprasza na świeże ciasteczka i rzemieślnicze torty. Zamów z odbiorem własnym lub prosto do domu!",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Słodka Ola",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Cukiernia \"Słodka Ola\" 🍰 Twoje Ulubione Wypieki",
    description: "Sprawdź menu pełne radości. Od klasycznych piegusków do wykwintnych tortów. Cukiernia Słodka Ola zaprasza!",
    url: "https://DaKU720.github.io/bakery-concept",
    siteName: "Cukiernia Słodka Ola",
    images: [
      {
        url: "https://DaKU720.github.io/bakery-concept/images/logo.png",
        width: 800,
        height: 800,
        alt: "Logo Cukierni Słodka Ola dziewczyna z ciastem",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cukiernia \"Słodka Ola\" 🍰 Twoje Ulubione Wypieki",
    description: "Sprawdź menu pełne radości. Cukiernia Słodka Ola zaprasza po pyszne ciasta i torty!",
    images: ["https://DaKU720.github.io/bakery-concept/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={`${quicksand.variable} ${nunito.variable} antialiased font-sans bg-background text-foreground`}>
        {children}
        <Footer />
        <ToastProvider />
        <WelcomeModal />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
