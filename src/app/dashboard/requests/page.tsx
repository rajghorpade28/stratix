import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RequestsClient } from "@/components/dashboard/RequestsClient";

export const metadata = {
  title: "My Requests | STRATIX",
};

export default async function RequestsPage() {
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
    ...user.websiteRequests.map(r => ({ ...r, reqType: "website" })),
    ...user.appRequests.map(r => ({ ...r, reqType: "app" })),
    ...user.graphicsRequests.map(r => ({ ...r, reqType: "graphics" })),
    ...user.automationRequests.map(r => ({ ...r, reqType: "automation" })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">My Requests</h1>
        <p className="text-muted-foreground">View and manage all your project submissions.</p>
      </div>

      <RequestsClient requests={allRequests} />
    </div>
  );
}
