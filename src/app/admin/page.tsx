import { getDashboardStats, getRecentActivity } from "@/actions/admin";
import { Users, FileText, Globe, Smartphone, Palette, Zap, MessageSquare } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentActivity = await getRecentActivity();

  const kpis = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Leads", value: stats.totalLeads, icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Website Req", value: stats.totalWebsiteRequests, icon: Globe, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "App Req", value: stats.totalAppRequests, icon: Smartphone, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Graphics Req", value: stats.totalGraphicsRequests, icon: Palette, color: "text-pink-500", bg: "bg-pink-500/10" },
    { label: "Automation Req", value: stats.totalAutomationRequests, icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Contact Subs", value: stats.totalContactSubmissions, icon: MessageSquare, color: "text-teal-500", bg: "bg-teal-500/10" },
  ];

  return (
    <div className="space-y-10">
      
      {/* KPIs */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-700 slide-in-from-bottom-2">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${kpi.bg}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                  <h3 className="text-3xl font-bold mt-1">{kpi.value}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-6">Recent Activity</h2>
        <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden animate-in fade-in duration-700 slide-in-from-bottom-2 delay-150 fill-mode-both">
          <div className="divide-y divide-border">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No recent activity.</div>
            ) : (
              recentActivity.map((activity, idx) => {
                let identifier = "Unknown";
                if (activity.type === "New User Registered") {
                  identifier = (activity.data as any).email;
                } else if (activity.type === "Contact Submission") {
                  identifier = (activity.data as any).email;
                } else {
                  identifier = (activity.data as any).user?.email || "Guest User";
                }

                return (
                  <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-accent/5 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {activity.type}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(activity.date, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-foreground font-medium">{identifier}</p>
                    </div>
                    {activity.type !== "New User Registered" && activity.type !== "Contact Submission" && (
                       <div className="text-sm">
                         Status: <span className="font-semibold">{(activity.data as any).status}</span>
                       </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
