import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ToastContainer />
        <main>{children}</main>
      </body>
    </html>
  );
}

