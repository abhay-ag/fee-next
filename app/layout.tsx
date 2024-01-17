import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Root from "@/lib/Root";

export const metadata: Metadata = {
  title: "Dash LMS",
  description: "Team DASHLMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Root>
          {children}
          <Toaster />
        </Root>
      </body>
    </html>
  );
}
