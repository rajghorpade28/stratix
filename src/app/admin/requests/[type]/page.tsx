"use client";

import { useEffect, useState } from "react";
import { getRequestsByType, updateRequestStatus } from "@/actions/admin";
import { format } from "date-fns";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const statuses = ["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "CLOSED"];

export default function AdminRequestsPage({ params }: { params: { type: string } }) {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const type = params.type as "website" | "app" | "graphics" | "automation" | "contact";
  
  const titleMap = {
    website: "Website Requests",
    app: "App Requests",
    graphics: "Graphics Requests",
    automation: "Automation Requests",
    contact: "Contact Submissions"
  };

  useEffect(() => {
    loadRequests();
  }, [type]);

  const loadRequests = async () => {
    try {
      const data = await getRequestsByType(type);
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      await updateRequestStatus(type, id, newStatus);
      setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-accent" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold">{titleMap[type]}</h2>
        <div className="text-sm text-muted-foreground">Total: {requests.length}</div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-4">ID / Date</th>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((req) => {
                // Handle ContactLead which doesn't have a structured user object directly in the same way if anonymous
                const name = req.name || req.user?.name || "Guest";
                const email = req.email || req.user?.email || "N/A";
                const phone = req.phone || req.user?.phone || "N/A";

                return (
                  <tr key={req.id} className="hover:bg-accent/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-muted-foreground mb-1">{req.id.substring(0,8)}...</div>
                      <div className="font-medium">{format(new Date(req.createdAt), "MMM d, yyyy")}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{name}</div>
                      <div className="text-muted-foreground text-xs">{email}</div>
                      <div className="text-muted-foreground text-xs">{phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          disabled={updating === req.id}
                          className="bg-background border border-border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-accent disabled:opacity-50"
                        >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {updating === req.id && <Loader2 className="animate-spin w-4 h-4 text-accent" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* For a full production app, this would open a modal with the JSON data. For now we show a button that could do it. */}
                      <button 
                        className="text-primary hover:underline font-medium text-xs"
                        onClick={() => alert(req.data ? JSON.stringify(JSON.parse(req.data), null, 2) : req.message || "No specific details.")}
                      >
                        View Payload
                      </button>
                    </td>
                  </tr>
                );
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
