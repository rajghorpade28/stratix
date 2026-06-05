"use client";

import { useState } from "react";
import { format } from "date-fns";
import { UserRequestModal } from "@/components/dashboard/UserRequestModal";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

export function RequestsClient({ requests }: { requests: any[] }) {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  if (requests.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-xl shadow-sm p-12 text-center">
        <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No projects yet</h3>
        <p className="text-muted-foreground mb-6">You haven't submitted any requests.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50 whitespace-nowrap">
            <tr>
              <th className="px-6 py-4">Request ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date Submitted</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {requests.map((req) => {
              const isPending = ['NEW', 'UNDER_REVIEW', 'CONTACTED'].includes(req.status);
              const isInProgress = ['PROPOSAL_SENT', 'APPROVED', 'IN_PROGRESS'].includes(req.status);
              
              const statusColor = 
                isPending ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                isInProgress ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                'bg-green-500/20 text-green-500 border-green-500/30';

              return (
                <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {req.id.substring(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider",
                      req.reqType === 'app' ? "bg-accent/10 text-accent" : 
                      req.reqType === 'website' ? "bg-primary/10 text-primary" : 
                      "bg-blue-500/10 text-blue-500"
                    )}>
                      {req.reqType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(req.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", statusColor)}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedRequest(req)}
                      className="text-primary hover:underline font-medium text-xs"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <UserRequestModal 
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        type={selectedRequest?.reqType || "website"}
      />
    </div>
  );
}
