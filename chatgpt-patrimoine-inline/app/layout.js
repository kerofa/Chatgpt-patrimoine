export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>Mon Gestionnaire de Patrimoine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f3' }}>
        {children}
      </body>
    </html>
  );
}