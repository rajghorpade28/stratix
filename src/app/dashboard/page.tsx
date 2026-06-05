import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, LayoutDashboard, User as UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const metadata = {
  title: "Dashboard Overview | STRATIX",
};

export default async function DashboardOverviewPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      websiteRequests: true,
      appRequests: true,
      graphicsRequests: true,
      automationRequests: true,
    }
  });

  if (!user) {
    redirect("/auth/login");
  }

  const allRequests = [
    ...user.websiteRequests,
    ...user.appRequests,
    ...user.graphicsRequests,
    ...user.automationRequests,
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const totalRequests = allRequests.length;
  
  const activeStatuses = ['NEW', 'UNDER_REVIEW', 'CONTACTED', 'PROPOSAL_SENT', 'APPROVED', 'IN_PROGRESS'];
  const activeRequests = allRequests.filter(req => activeStatuses.includes(req.status)).length;
  const completedRequests = allRequests.filter(req => req.status === 'COMPLETED').length;

  const lastSubmissionDate = allRequests.length > 0 
    ? formatDistanceToNow(allRequests[0].createdAt, { addSuffix: true }) 
    : "Never";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Welcome back, {user.name?.split(" ")[0] || "Client"}!</h1>
        <p className="text-muted-foreground">Manage your projects, review quotations, and track progress here.</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Start a New Project</h2>
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
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Account Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Total Submitted</h3>
            <p className="text-3xl font-heading font-bold">{totalRequests}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Active Projects</h3>
            <p className="text-3xl font-heading font-bold text-accent">{activeRequests}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Completed</h3>
            <p className="text-3xl font-heading font-bold text-green-500">{completedRequests}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Last Activity</h3>
            <p className="text-xl font-medium mt-2">{lastSubmissionDate}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
