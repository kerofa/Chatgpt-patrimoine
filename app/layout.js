export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Mon Gestionnaire de Patrimoine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}