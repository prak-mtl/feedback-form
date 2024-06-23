import { Inter } from "next/font/google";
import "./globals.css";
import "./globals.scss";
import Providers from "@/redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feedback Form",
  description: "Generated to take feedbacks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
