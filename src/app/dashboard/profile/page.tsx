import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { User as UserIcon } from "lucide-react";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-lg p-8 shadow-sm max-w-3xl">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input defaultValue={user.name || ""} disabled className="bg-muted/30" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <Input defaultValue={user.phone || ""} disabled className="bg-muted/30" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input defaultValue={user.email} disabled className="bg-muted/30" />
          </div>
          
          <div className="pt-4 border-t border-border/50 mt-8">
            <p className="text-xs text-muted-foreground italic">
              Profile editing functionality will be available in a future update. For urgent changes, please contact support.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
