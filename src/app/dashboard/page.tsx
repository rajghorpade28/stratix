import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { LogOut, User as UserIcon, LayoutDashboard, FileText, Settings } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { cn } from "@/lib/utils";

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
              <SignOutButton />
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Quick Actions */}
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/start" className="group flex flex-col p-4 bg-card border border-border/50 rounded-xl hover:border-primary/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">New Website</span>
                  <span className="text-xs text-muted-foreground mt-1">Start a web project</span>
                </Link>
                <Link href="/start-app" className="group flex flex-col p-4 bg-card border border-border/50 rounded-xl hover:border-accent/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <LayoutDashboard className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-semibold text-foreground">New App</span>
                  <span className="text-xs text-muted-foreground mt-1">Start an app project</span>
                </Link>
                <Link href="/contact" className="group flex flex-col p-4 bg-card border border-border/50 rounded-xl hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="font-semibold text-foreground">Book Call</span>
                  <span className="text-xs text-muted-foreground mt-1">Talk to our team</span>
                </Link>
              </div>
            </div>

            {/* Stats Overview */}
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Requests</h3>
                  <p className="text-3xl font-heading font-bold">{totalRequests}</p>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Website Projects</h3>
                  <p className="text-3xl font-heading font-bold">{user.websiteRequests.length}</p>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">App Projects</h3>
                  <p className="text-3xl font-heading font-bold">{user.appRequests.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border/50 rounded-xl shadow-sm">
              <div className="px-6 py-5 border-b border-border/50 flex justify-between items-center">
                <h2 className="font-heading font-bold text-lg">Recent Activity</h2>
              </div>
              
              <div className="p-6">
                {totalRequests === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
                    <p className="text-muted-foreground mb-6">Start a new project to see it tracked here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...user.appRequests, ...user.websiteRequests]
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((req: any) => {
                        const isApp = 'appType' in req;
                        const statusColor = 
                          req.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                          req.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                          'bg-green-500/20 text-green-500 border-green-500/30';
                        const dotColor = 
                          req.status === 'PENDING' ? 'bg-yellow-500' :
                          req.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                          'bg-green-500';

                        return (
                          <div key={req.id} className="flex flex-col sm:flex-row justify-between p-5 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className={cn(
                                  "text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider",
                                  isApp ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                                )}>
                                  {isApp ? 'App' : 'Website'}
                                </span>
                                <span className="text-xs text-muted-foreground font-medium">{new Date(req.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </div>
                              <p className="font-medium text-foreground">
                                {isApp ? 'App Development Requirement' : 'Website Development Requirement'}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 border", statusColor)}>
                                <span className="relative flex h-2 w-2">
                                  {(req.status === 'PENDING' || req.status === 'IN_PROGRESS') && (
                                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dotColor)}></span>
                                  )}
                                  <span className={cn("relative inline-flex rounded-full h-2 w-2", dotColor)}></span>
                                </span>
                                {req.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
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
