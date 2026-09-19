import { Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  BarChart3, Boxes, ChevronRight, ClipboardList, Crown, FolderTree,
  LogOut, Menu, Shield, ShoppingBag, Users, X, UserCog,
} from "lucide-react";
import { authApi } from "@/lib/api";
import { useCurrentUser } from "@/hooks/useAdmin";

const nav = [
  { label: "Dashboard", to: "/admin", icon: BarChart3, end: true },
  { label: "Products", to: "/admin/products", icon: ShoppingBag },
  { label: "Categories", to: "/admin/categories", icon: FolderTree },
  { label: "Orders", to: "/admin/orders", icon: ClipboardList },
  { label: "Customers", to: "/admin/customers", icon: Users },
  { label: "Staff", to: "/admin/staff", icon: UserCog },
];

export function AdminShell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user, isLoading, isError } = useCurrentUser();
  const isLoginPage = location.pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !isLoading && (isError || !user || !["admin", "superadmin"].includes(user.role))) {
      navigate({ to: "/admin/login" });
    }
  }, [isLoading, isError, user, navigate]);

  const logout = async () => {
    try { await authApi.logout(); } finally {
      localStorage.removeItem("bigcrown_token");
      navigate({ to: "/admin/login" });
    }
  };

  if (isLoginPage) return <Outlet />;

  if (isLoading || !user || !["admin", "superadmin"].includes(user.role)) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Checking admin access…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-slate-950 text-white transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-600"><Crown className="size-5" /></div>
            <div><div className="font-display text-xl">BIGCROWN</div><div className="text-[10px] uppercase tracking-[0.25em] text-purple-300">Admin Console</div></div>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X /></button>
        </div>
        <div className="px-4 py-6">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Management</div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
              const Icon = item.icon;
              return <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-purple-600 text-white shadow-lg shadow-purple-950/30" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}><Icon className="size-5" /><span>{item.label}</span>{active && <ChevronRight className="ml-auto size-4" />}</Link>;
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3"><div className="flex size-9 items-center justify-center rounded-full bg-purple-500/20 text-purple-300"><Shield className="size-4" /></div><div className="min-w-0"><div className="truncate text-sm font-semibold">{user.name}</div><div className="text-xs capitalize text-slate-400">{user.role}</div></div></div>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-300"><LogOut className="size-4" /> Sign out</button>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white/90 px-4 backdrop-blur sm:px-6">
          <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
          <div className="ml-auto flex items-center gap-3"><span className="hidden text-sm text-slate-500 sm:inline">Signed in as <strong className="text-slate-900">{user.email}</strong></span><div className="flex size-9 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">{user.name?.charAt(0)?.toUpperCase()}</div></div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-600">BIGCROWN Hair</div><h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div>{action}</div>;
}
