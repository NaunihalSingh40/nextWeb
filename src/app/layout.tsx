// app/layout.tsx
import Layout from "views/Layout";
import "./globals.css";
import Providers from "providers";

export const metadata = {
  title: "My App",
  description: "E-commerce App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
