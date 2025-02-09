import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Salad Factory - Fresh & Healthy Salads",
  description: "Discover our fresh, healthy, and delicious salads at Salad Factory. Order your perfect salad today with customizable ingredients and dietary options.",
  keywords: "salad, healthy food, fresh salads, vegetarian, gluten-free, healthy eating, food delivery",
  authors: [{ name: "Salad Factory" }],
  themeColor: "#16a34a", // green-600
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Salad Factory - Fresh & Healthy Salads",
    description: "Fresh, healthy, and delicious salads delivered to you.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salad Factory Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} font-sans antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
