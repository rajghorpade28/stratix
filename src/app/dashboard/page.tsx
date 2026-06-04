import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { LogOut, User as UserIcon, LayoutDashboard, FileText, Settings } from "lucide-react";

export const metadata = {
  title: "Dashboard | STRATIX",
};

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      websiteRequests: true,
      appRequests: true,
      contactLeads: true,
    }
  });

  if (!user) {
    redirect("/auth/login");
  }

  const totalRequests = user.websiteRequests.length + user.appRequests.length;

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              
              {user.role === "ADMIN" && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Link href="/admin" className="text-sm font-semibold text-accent hover:underline flex items-center gap-2">
                    <Settings size={14} /> Go to Admin Panel
                  </Link>
                </div>
              )}
            </div>

            <nav className="bg-card border border-border/50 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-accent/5 text-accent font-medium border-l-2 border-accent">
                <LayoutDashboard size={18} />
                Overview
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Settings size={18} />
                Profile Settings
              </Link>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/auth/login" });
              }}>
                <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 transition-colors text-left">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </form>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Requests</h3>
                <p className="text-3xl font-heading font-bold">{totalRequests}</p>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Website Projects</h3>
                <p className="text-3xl font-heading font-bold">{user.websiteRequests.length}</p>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">App Projects</h3>
                <p className="text-3xl font-heading font-bold">{user.appRequests.length}</p>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="font-heading font-bold text-lg">Your Submitted Requirements</h2>
              </div>
              
              <div className="p-6">
                {totalRequests === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-6">Start a new project to see it tracked here.</p>
                    <div className="flex justify-center gap-4">
                      <Link href="/start" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
                        Website Project
                      </Link>
                      <Link href="/start-app" className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors">
                        App Project
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.appRequests.map((req) => (
                      <div key={req.id} className="flex flex-col sm:flex-row justify-between p-4 border border-border/50 rounded-md hover:border-accent/30 transition-colors gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">App</span>
                            <span className="text-sm text-muted-foreground">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-medium text-foreground">App Development Requirement</p>
                        </div>
                        <div className="flex items-center">
                          <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-semibold uppercase">
                            {req.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {user.websiteRequests.map((req) => (
                      <div key={req.id} className="flex flex-col sm:flex-row justify-between p-4 border border-border/50 rounded-md hover:border-primary/30 transition-colors gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">Website</span>
                            <span className="text-sm text-muted-foreground">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-medium text-foreground">Website Development Requirement</p>
                        </div>
                        <div className="flex items-center">
                          <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-semibold uppercase">
                            {req.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
