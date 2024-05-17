import './ui/global.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-dark-teal/theme.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL.pizza - Formatter',
  description: 'Use our SQL query formatter online to beautify your SQL code instantly. Enhance readability and maintainability with our free tool.',
  keywords: 'sql query formatter, sql query formatter online, sql code formatter, sql beautify, best sql formatter'
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
