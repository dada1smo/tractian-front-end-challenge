import UIHeader from '@/ui/components/Header';

export default async function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh w-dvw overflow-hidden bg-background flex flex-col">
      <UIHeader />
      <div className="p-2 flex flex-col items-stretch grow">
        <div className="bg-white rounded border-1 border-border-card grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
