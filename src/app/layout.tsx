import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Cukiernia \"Słodka Ola\" - Tradycyjne Wypieki i Desery",
  description: "Masz smaka na coś pysznego? Cukiernia 'Słodka Ola' zaprasza na świeże ciasteczka i rzemieślnicze torty. Zamów z odbiorem własnym lub prosto do domu!",
  openGraph: {
    title: "Cukiernia \"Słodka Ola\" 🍰 Twoje Ulubione Wypieki",
    description: "Sprawdź menu pełne radości. Od klasycznych piegusków do wykwintnych tortów. Cukiernia Słodka Ola zaprasza!",
    url: "https://slodkaola.pl",
    siteName: "Cukiernia Słodka Ola",
    images: [
      {
        url: "/images/logo.png",
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
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${quicksand.variable} ${nunito.variable} antialiased font-sans bg-background text-foreground`}>
        {children}
        <Footer />
        <ToastProvider />
        <WelcomeModal />
      </body>
    </html>
  );
}
