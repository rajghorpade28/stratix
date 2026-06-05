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
    <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4 shrink-0">
            <nav className="bg-card border border-border/50 rounded-lg shadow-sm overflow-hidden flex flex-col">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive 
                        ? "bg-accent/5 text-accent font-medium border-l-2 border-accent" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
              
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors border-l-2 border-transparent text-left w-full"
              >
                <LogOut size={18} />
                Sign Out
              </button>
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
