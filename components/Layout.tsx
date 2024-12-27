interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white font-light">
      <main>
        {children}
      </main>
    </div>
  );
}
