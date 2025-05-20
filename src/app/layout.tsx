import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next";
// Load Poppins with desired weights
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Adjust weights as needed
});

export const metadata: Metadata = {
  title: "DibsChicago - Never Miss an Event Again",
  description: "Get weekly event notifications straight to your phone!",
  icons: {
    icon: "/favicon.png",      // Correct path for favicon in public/
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="chicago-flag">
      <body className={`${poppins.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
