import './ui/global.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-dark-amber/theme.css'
        

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }