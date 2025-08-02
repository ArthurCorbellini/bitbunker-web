import { SideMenuServer } from "./_components/category-side-menu/side-menu.server";

export default async function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="w-3/4">
        {children}
      </div>
      <div className="w-1/4">
        <SideMenuServer />
      </div>
    </div>
  );
}
