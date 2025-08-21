
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}