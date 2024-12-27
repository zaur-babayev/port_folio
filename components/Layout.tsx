import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white font-light">
      <Header />
      <main className="pt-24">
        {children}
      </main>
    </div>
  );
}
