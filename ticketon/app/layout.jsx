import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/src/context/AuthContext";
import CartProvider from "@/src/context/CartContext";
import Header from "@/src/common/header/Header";
import Footer from "@/src/common/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticketon",
  description: "Платформа онлайн-бронирования билетов",
};

export default function RootLayout({children}){
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
