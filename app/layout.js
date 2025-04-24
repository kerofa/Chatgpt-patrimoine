export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>chatgpt-patrimoine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}