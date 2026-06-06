"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  HelpCircle,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Requests", href: "/dashboard/requests", icon: FileText },
    { label: "Profile", href: "/dashboard/profile", icon: Settings },
    { label: "Support", href: "/dashboard/support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary/10 mix-blend-normal filter blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-accent/5 mix-blend-normal filter blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="w-full md:w-72 space-y-4 shrink-0">
            <nav className="glass border border-border/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden mb-1 ${
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
              
              <div className="mt-4 pt-4 border-t border-border/30">
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300 border border-transparent hover:border-destructive/30 text-left w-full"
                >
                  <LogOut size={18} />
                  <span className="text-[13.5px] font-medium tracking-wide">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
