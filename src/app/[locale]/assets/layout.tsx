import { CategoryMenuServer } from "./_components/CategoryMenu.server";

export default async function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="w-3/4">
        {children}
      </div>
      <div className="w-1/4">
        <CategoryMenuServer />
      </div>
    </div>
  );
}
