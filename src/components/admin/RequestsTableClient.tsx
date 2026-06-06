"use client";

import { useState } from "react";
import { updateRequestStatus } from "@/actions/admin";
import { format } from "date-fns";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const statuses = ["NEW", "UNDER_REVIEW", "CONTACTED", "PROPOSAL_SENT", "APPROVED", "IN_PROGRESS", "COMPLETED", "CLOSED"];

export function RequestsTableClient({ initialRequests, type }: { initialRequests: any[], type: string }) {
  const [requests, setRequests] = useState<any[]>(initialRequests);
  const [updating, setUpdating] = useState<string | null>(null);

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

  return (
    <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-all duration-300 animate-in fade-in duration-700 slide-in-from-bottom-2">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border/60 whitespace-nowrap">
            <tr>
              <th className="px-6 py-4">ID / Date</th>
              <th className="px-6 py-4">Client Details</th>
              {type === "website" && <th className="px-6 py-4">Quote / Timeline</th>}
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((req) => {
              let parsedData: any = {};
              try {
                parsedData = req.data ? JSON.parse(req.data) : {};
              } catch (e) {}

              const name = req.name || req.user?.name || parsedData.businessInfo?.name || parsedData.name || "Guest";
              const email = req.email || req.user?.email || parsedData.businessInfo?.email || parsedData.email || "N/A";
              const phone = req.phone || req.user?.phone || parsedData.businessInfo?.phone || parsedData.phone || "N/A";
              const businessName = parsedData.businessInfo?.name || parsedData.company || "N/A";

              const formatPrice = (price: number) => {
                return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
              };

              return (
                <tr key={req.id} className="hover:bg-accent/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-muted-foreground mb-1">{req.id.substring(0,8)}...</div>
                    <div className="font-medium">{format(new Date(req.createdAt), "MMM d, yyyy")}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{name}</div>
                    {businessName !== "N/A" && businessName !== name && (
                      <div className="text-xs text-accent font-medium mb-1">{businessName}</div>
                    )}
                    <div className="text-muted-foreground text-xs">{email}</div>
                    <div className="text-muted-foreground text-xs">{phone}</div>
                  </td>
                  {type === "website" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {req.calculatedQuote ? (
                        <>
                          <div className="font-bold text-foreground">{formatPrice(req.calculatedQuote)}</div>
                          <div className="text-xs text-muted-foreground">{req.calculatedTimeline} Days Max</div>
                        </>
                      ) : (
                        <div className="text-xs text-muted-foreground">N/A</div>
                      )}
                    </td>
                  )}
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
                    <Link 
                      href={`/admin/requests/${type}/${req.id}`}
                      className="text-primary hover:underline font-medium text-xs"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
            {requests.length === 0 && (
              <tr>
                <td colSpan={type === "website" ? 5 : 4} className="px-6 py-8 text-center text-muted-foreground">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
