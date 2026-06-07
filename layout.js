export const metadata = {
  title: 'Kwefi AI — المستشار التسويقي الذكي',
  description: 'استشارات تسويقية ذكية للشركات الصغيرة والمتوسطة',
  manifest: '/manifest.json',
  themeColor: '#ffb400',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Kwefi AI',
  },
  openGraph: {
    title: 'Kwefi AI — المستشار التسويقي الذكي',
    description: 'احصل على استشارات تسويقية احترافية فورية',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=DM+Sans:wght@400;500;600&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#0a0a0f', fontFamily: "'Cairo', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
