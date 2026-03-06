import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "700", "800"],
});

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
  // weight:
});

export const metadata = {
  metadataBase: new URL("https://kids-commerce-three.vercel.app/"),

  title: {
    default: "Hero Kidz | Best Kids Toy Store",
    template: "%s | Hero Kidz",
  },

  description:
    "Hero Kidz is an online toy store where you can find fun, safe and educational toys for kids. Discover the best toys for your children.",

  keywords: [
    "kids toys",
    "children toys",
    "educational toys",
    "toy shop",
    "kids ecommerce",
    "hero kidz toys",
  ],

  authors: [
    {
      name: "Hero Kidz",
      url: "https://herokidz.com",
    },
  ],

  creator: "Hero Kidz",
  publisher: "Hero Kidz",

  alternates: {
    canonical: "https://kids-commerce-three.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Hero Kidz | Best Kids Toy Store",
    description:
      "Find fun and educational toys for kids at Hero Kidz. Safe toys, best quality and affordable prices.",
    url: "https://kids-commerce-three.vercel.app",
    siteName: "Hero Kidz",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Toy Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz | Best Kids Toy Store",
    description: "Buy fun and educational toys for kids.",
    images: ["/og-home.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },

  category: "ecommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased`}>
        <header className=" md:w-11/12 mx-auto">
          <Navbar />
        </header>
        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-288px)]">
          {children}{" "}
        </main>
        <footer className="py-2 mx-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
