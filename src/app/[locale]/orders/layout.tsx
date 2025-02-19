import OrderList from "./_components/order-list";

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