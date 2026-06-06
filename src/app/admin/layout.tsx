"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Globe, 
  Smartphone, 
  Palette, 
  Zap, 
  MessageSquare,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Website Requests", href: "/admin/requests/website", icon: Globe },
    { label: "App Requests", href: "/admin/requests/app", icon: Smartphone },
    { label: "Graphics Requests", href: "/admin/requests/graphics", icon: Palette },
    { label: "Automation Requests", href: "/admin/requests/automation", icon: Zap },
    { label: "Contact Submissions", href: "/admin/requests/contact", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 mix-blend-normal filter blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-accent/5 mix-blend-normal filter blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card/40 backdrop-blur-2xl fixed h-full flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        <div className="h-20 flex items-center px-8 border-b border-border/40">
          <span className="text-xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-widest drop-shadow-sm">
            STRATIX<span className="text-foreground ml-2 text-xs font-bold tracking-widest opacity-80">ADMIN</span>
          </span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? "bg-accent/10 text-accent shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] border border-accent/20" 
                    : "text-muted-foreground hover:bg-black/5 hover:text-foreground border border-transparent"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent shadow-[0_0_10px_rgba(217,70,239,0.8)] rounded-r-full" />
                )}
                <Icon size={18} className={`relative z-10 ${isActive ? "text-accent drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" : "group-hover:text-foreground transition-colors"}`} />
                <span className={`text-[13.5px] font-medium relative z-10 ${isActive ? "tracking-wide" : ""}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/40 bg-card/20">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-muted-foreground hover:bg-destructive/20 hover:text-destructive hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-transparent hover:border-destructive/30"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen pb-12 relative z-10 flex flex-col">
        <div className="h-20 border-b border-border/40 bg-background/60 backdrop-blur-xl flex items-center px-10 sticky top-0 z-30 shadow-sm">
          <h1 className="text-[13px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground to-foreground uppercase tracking-[0.2em]">
            {navItems.find(i => pathname === i.href || (i.href !== "/admin" && pathname.startsWith(i.href)))?.label || "Admin Panel"}
          </h1>
        </div>
        <div className="p-10 max-w-[1600px] mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
