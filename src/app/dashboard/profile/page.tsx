import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, User as UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Profile Settings | STRATIX",
};

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-4">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-heading font-bold text-foreground">Profile Settings</h1>
        </div>

        <div className="bg-card border border-border/50 rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded uppercase">
                {user.role} Role
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input defaultValue={user.name || ""} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input defaultValue={user.phone || ""} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input defaultValue={user.email} disabled />
            </div>
            
            <p className="text-xs text-muted-foreground mt-4 italic">
              Profile editing functionality will be available in the next update.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
