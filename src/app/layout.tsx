import "./index.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
