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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-card border border-border/60 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(217,70,239,0.08)] hover:-translate-y-1 transition-all duration-500 flex items-center gap-5 relative overflow-hidden group animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 fill-mode-both" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm relative z-10 ${kpi.bg}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className="relative z-10">
                  <p className="text-[13px] font-semibold tracking-wide text-muted-foreground uppercase">{kpi.label}</p>
                  <h3 className="text-3xl font-heading font-bold mt-1 text-foreground">{kpi.value}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-heading font-bold mb-6">Recent Activity</h2>
        <div className="bg-card border border-border/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-shadow duration-300 overflow-hidden animate-in fade-in zoom-in-[0.98] slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
          <div className="divide-y divide-border/60">
            {recentActivity.length === 0 ? (
              <div className="p-10 text-center text-muted-foreground">No recent activity.</div>
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
                  <div key={idx} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold tracking-wider text-accent uppercase">
                          {activity.type}
                        </span>
                        <span className="text-[13px] font-medium text-muted-foreground">
                          {formatDistanceToNow(activity.date, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-foreground font-semibold text-base">{identifier}</p>
                    </div>
                    {activity.type !== "New User Registered" && activity.type !== "Contact Submission" && (
                       <div className="text-sm px-4 py-2 bg-background border border-border/50 rounded-lg shadow-sm">
                         Status: <span className="font-bold text-foreground">{(activity.data as any).status}</span>
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
