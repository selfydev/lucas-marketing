import type { Metadata } from "next";
import { Geist, Baloo_2 } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lucas AI | Your Child's Personal Learning Companion",
  description:
    "Lucas is an AI-powered personal assistant designed specifically for kids in education. Making learning fun, engaging, and personalized for every child.",
  keywords: [
    "AI for kids",
    "educational AI",
    "learning assistant",
    "kids education",
    "personalized learning",
  ],
  authors: [{ name: "Lucas AI" }],
  openGraph: {
    title: "Lucas AI | Your Child's Personal Learning Companion",
    description:
      "Making learning fun, engaging, and personalized for every child.",
    type: "website",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${baloo.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
