import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Crown, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({ component: AdminLogin });

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true);
    try {
      const { data } = await authApi.login({ email, password });
      if (!["admin", "superadmin"].includes(data.user.role)) { toast.error("This account does not have admin access."); return; }
      localStorage.setItem("bigcrown_token", data.token);
      toast.success("Welcome to BIGCROWN Admin");
      navigate({ to: "/admin" });
    } catch (err: any) { toast.error(err?.response?.data?.message || "Unable to sign in"); }
    finally { setLoading(false); }
  }

  return <div className="grid min-h-screen lg:grid-cols-2">
    <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3"><div className="flex size-11 items-center justify-center rounded-xl bg-purple-600"><Crown /></div><div><div className="font-display text-2xl">BIGCROWN</div><div className="text-xs uppercase tracking-[0.25em] text-purple-300">Hair</div></div></div>
      <div className="max-w-lg"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300"><ShieldCheck className="size-4" /> Secure staff portal</div><h1 className="font-display text-6xl leading-tight">Run the store behind the crown.</h1><p className="mt-6 text-lg leading-8 text-slate-400">Manage products, categories, customers, orders and your team from one place.</p></div>
      <div className="text-xs text-slate-500">BIGCROWN Hair · Admin Console</div>
    </div>
    <div className="flex items-center justify-center bg-white px-6 py-12"><form onSubmit={submit} className="w-full max-w-md">
      <div className="mb-10 lg:hidden"><div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-600 text-white"><Crown /></div><h1 className="mt-4 text-center font-display text-3xl">BIGCROWN Admin</h1></div>
      <div className="mb-8"><div className="text-sm font-semibold text-purple-600">Staff sign in</div><h2 className="mt-2 text-3xl font-bold">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Use your admin or superadmin account.</p></div>
      <label className="mb-5 block"><span className="mb-2 block text-sm font-semibold">Email</span><input value={email} onChange={e => setEmail(e.target.value)} type="email" required autoComplete="username" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" placeholder="admin@bigcrownhair.com" /></label>
      <label className="mb-7 block"><span className="mb-2 block text-sm font-semibold">Password</span><div className="relative"><input value={password} onChange={e => setPassword(e.target.value)} type={show ? "text" : "password"} required autoComplete="current-password" className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" placeholder="••••••••" /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div></label>
      <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 disabled:opacity-60">{loading && <Loader2 className="size-4 animate-spin" />} Sign in to admin</button>
      <p className="mt-6 text-center text-xs text-slate-400">Customer accounts cannot access this portal.</p>
    </form></div>
  </div>;
}
