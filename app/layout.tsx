import './ui/global.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL.pizza',
  description: 'SQL Formatter',
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <body>{children}</body>
      </html>
    )
  }
