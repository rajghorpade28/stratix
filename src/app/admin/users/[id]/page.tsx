import { getUserDetails } from "@/actions/admin";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserDetails(params.id);

  if (!user) {
    notFound();
  }

  const allRequests = [
    ...user.websiteRequests.map(r => ({ type: 'Website', date: r.createdAt, status: r.status })),
    ...user.appRequests.map(r => ({ type: 'App', date: r.createdAt, status: r.status })),
    ...user.graphicsRequests.map(r => ({ type: 'Graphics', date: r.createdAt, status: r.status })),
    ...user.automationRequests.map(r => ({ type: 'Automation', date: r.createdAt, status: r.status })),
    ...user.contactLeads.map(r => ({ type: 'Contact', date: r.createdAt, status: r.status })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/users" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4">
          <ArrowLeft size={16} /> Back to Users
        </Link>
        <h2 className="text-3xl font-heading font-bold">{user.name || "User Profile"}</h2>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Info */}
        <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-heading font-bold mb-4 border-b border-border pb-2">Account Information</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono">{user.id}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span>{user.phone || "Not provided"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-semibold">{user.role}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Registered:</span>
              <span>{format(user.createdAt, "PPP")}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-muted-foreground">Email Verified:</span>
              <span>
                {user.emailVerified ? (
                  <span className="flex items-center gap-1 text-green-500"><CheckCircle2 size={16}/> Yes</span>
                ) : (
                  <span className="flex items-center gap-1 text-destructive"><XCircle size={16}/> No</span>
                )}
              </span>
            </li>
          </ul>
        </div>

        {/* Requests Summary */}
        <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-heading font-bold mb-4 border-b border-border pb-2">Service Requests</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Website Requests:</span>
              <span className="font-bold">{user.websiteRequests.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">App Requests:</span>
              <span className="font-bold">{user.appRequests.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Graphics Requests:</span>
              <span className="font-bold">{user.graphicsRequests.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Automation Requests:</span>
              <span className="font-bold">{user.automationRequests.length}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Contact Requests:</span>
              <span className="font-bold">{user.contactLeads.length}</span>
            </li>
            <li className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="font-semibold">Total Submissions:</span>
              <span className="font-bold text-accent">{allRequests.length}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Submission History */}
      <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-heading font-bold mb-4 border-b border-border pb-2">Submission History</h3>
        {allRequests.length === 0 ? (
          <p className="text-muted-foreground text-sm">No submissions found for this user.</p>
        ) : (
          <div className="space-y-4">
            {allRequests.map((req, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-1">
                    {req.type}
                  </span>
                  <p className="text-sm text-muted-foreground">{format(req.date, "PPp")}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold">{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
