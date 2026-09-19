import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Boxes, ClipboardList, DollarSign, ShoppingBag, Users } from "lucide-react";
import { useAdminDashboard } from "@/hooks/useAdmin";
import { PageTitle } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const { data, isLoading, isError } = useAdminDashboard();
  const cards = [
    { label: "Revenue", value: `$${Number(data?.revenue ?? 0).toLocaleString()}`, icon: DollarSign, href: "/admin/orders" },
    { label: "Orders", value: Number(data?.orders ?? 0).toLocaleString(), icon: ClipboardList, href: "/admin/orders" },
    { label: "Customers", value: Number(data?.customers ?? 0).toLocaleString(), icon: Users, href: "/admin/customers" },
    { label: "Active products", value: Number(data?.products ?? 0).toLocaleString(), icon: ShoppingBag, href: "/admin/products" },
  ];
  return <><PageTitle title="Dashboard" description="A quick view of your BIGCROWN store." />
    {isError && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Unable to load dashboard data. Check that the API is running and your admin session is valid.</div>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(c => { const Icon=c.icon; return <Link key={c.label} to={c.href as any} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between"><div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><Icon className="size-5" /></div><ArrowUpRight className="size-4 text-slate-300 transition group-hover:text-purple-500" /></div><div className="mt-6 text-3xl font-bold">{isLoading ? "—" : c.value}</div><div className="mt-1 text-sm text-slate-500">{c.label}</div></Link>})}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><Boxes className="size-5" /></div><div><h2 className="font-semibold">Catalog</h2><p className="text-sm text-slate-500">Keep your storefront inventory fresh.</p></div></div><div className="mt-6 grid grid-cols-2 gap-3"><Link to="/admin/products" className="rounded-xl border p-4 text-sm font-semibold hover:border-purple-300 hover:bg-purple-50">Manage products</Link><Link to="/admin/categories" className="rounded-xl border p-4 text-sm font-semibold hover:border-purple-300 hover:bg-purple-50">Manage categories</Link></div></div><div className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><ClipboardList className="size-5" /></div><div><h2 className="font-semibold">Operations</h2><p className="text-sm text-slate-500">Process customer activity from the same console.</p></div></div><div className="mt-6 grid grid-cols-2 gap-3"><Link to="/admin/orders" className="rounded-xl border p-4 text-sm font-semibold hover:border-purple-300 hover:bg-purple-50">Manage orders</Link><Link to="/admin/customers" className="rounded-xl border p-4 text-sm font-semibold hover:border-purple-300 hover:bg-purple-50">View customers</Link></div></div></div>
  </>;
}
