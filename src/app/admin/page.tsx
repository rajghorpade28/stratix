import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { LogOut, Users, ShieldAlert, FileText, LayoutDashboard, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin Panel | STRATIX",
};

export default async function AdminPage() {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [users, websiteRequests, appRequests, contactLeads] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.websiteRequest.findMany({ include: { user: true }, orderBy: { createdAt: "desc" } }),
    prisma.appRequest.findMany({ include: { user: true }, orderBy: { createdAt: "desc" } }),
    prisma.contactLead.findMany({ include: { user: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <ShieldAlert className="w-8 h-8 text-destructive" />
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Admin Control Panel</h1>
              <p className="text-sm text-muted-foreground">Manage users and incoming service requests</p>
            </div>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent font-semibold rounded hover:bg-accent/20 transition-colors text-sm">
            <ArrowLeft size={16} /> Exit Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2"><Users size={16}/> Total Users</h3>
            <p className="text-3xl font-heading font-bold text-foreground">{users.length}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2"><FileText size={16}/> Website Reqs</h3>
            <p className="text-3xl font-heading font-bold text-foreground">{websiteRequests.length}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2"><LayoutDashboard size={16}/> App Reqs</h3>
            <p className="text-3xl font-heading font-bold text-foreground">{appRequests.length}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2"><FileText size={16}/> Contact Leads</h3>
            <p className="text-3xl font-heading font-bold text-foreground">{contactLeads.length}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-muted/30 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg">Registered Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b border-border/50">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Role</th>
                    <th className="px-6 py-3 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/10">
                      <td className="px-6 py-4 font-medium text-foreground">{u.name || "N/A"}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === "ADMIN" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
