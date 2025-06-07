import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: "Mini Blog",
  description: "A simple blog built with Next.js and SQLite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
