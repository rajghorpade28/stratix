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
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card fixed h-full flex flex-col z-10">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="text-xl font-heading font-bold text-foreground tracking-widest">STRATIX<span className="text-accent ml-2 text-sm font-normal">ADMIN</span></span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-accent/10 text-accent font-medium" 
                    : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-md transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen pb-12">
        {/* We can have a topbar here if needed, or just let children handle headers */}
        <div className="h-16 border-b border-border bg-background flex items-center px-8 sticky top-0 z-10">
          <h1 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
            {navItems.find(i => pathname === i.href || (i.href !== "/admin" && pathname.startsWith(i.href)))?.label || "Admin Panel"}
          </h1>
        </div>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
