import { OrderList } from "./_components/OrderList";

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <OrderList />
    </>
  )
}