import type { Metadata } from "next";
import {
  Inter,
  Assistant,
  Red_Hat_Display,
  Kaushan_Script,
} from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "@/components/shared/session_provider/session_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--assistant",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const red_hat_display = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--red-hat-display",
  weight: ["400", "500", "700"],
});

const kaushan_script = Kaushan_Script({
  subsets: ["latin"],
  variable: "--kaushan-script",
  weight: ["400"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={`${assistant.variable}, ${red_hat_display.variable}, ${kaushan_script.variable}`}
    >
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
