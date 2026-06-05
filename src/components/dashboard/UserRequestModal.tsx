"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { format } from "date-fns";

interface UserRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  type: "website" | "app" | "graphics" | "automation" | "contact";
}

export function UserRequestModal({ isOpen, onClose, request, type }: UserRequestModalProps) {
  if (!isOpen || !request) return null;

  let dataObj: any = {};
  try {
    dataObj = JSON.parse(request.data || "{}");
  } catch (e) {}

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-card border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative"
        >
          <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center z-10">
            <div>
              <h2 className="text-xl font-heading font-bold capitalize">{type} Request Details</h2>
              <p className="text-xs text-muted-foreground mt-1">Submitted on {format(new Date(request.createdAt), "MMMM d, yyyy")}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-border pb-2">Status</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-primary/10 text-primary border-primary/30">
                {request.status.replace('_', ' ')}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {request.status === 'NEW' && "Your request has been received and is waiting to be reviewed."}
                {request.status === 'UNDER_REVIEW' && "Our team is currently reviewing your requirements."}
                {request.status === 'CONTACTED' && "We have reached out to you to discuss details."}
                {request.status === 'PROPOSAL_SENT' && "A formal proposal has been sent to your email."}
                {request.status === 'APPROVED' && "The project proposal has been approved!"}
                {request.status === 'IN_PROGRESS' && "We are actively working on your project."}
                {request.status === 'COMPLETED' && "Your project has been completed successfully."}
                {request.status === 'CLOSED' && "This request has been closed."}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-border pb-2">Submitted Requirements</h3>
              <div className="bg-muted/50 p-6 rounded-lg border border-border/50">
                <dl className="space-y-4 text-sm">
                  {Object.entries(dataObj).map(([key, value]) => {
                    // Hide any internal or raw object data that isn't user friendly
                    if (typeof value === 'object' && value !== null) {
                      if (key === 'businessInfo') {
                        return (
                          <div key={key}>
                            <dt className="text-muted-foreground font-medium capitalize mb-1">Business Info</dt>
                            <dd className="text-foreground pl-4 border-l-2 border-border space-y-1">
                              {Object.entries(value as object).map(([subKey, subVal]) => (
                                <div key={subKey}><span className="text-muted-foreground capitalize">{subKey}:</span> {String(subVal)}</div>
                              ))}
                            </dd>
                          </div>
                        )
                      }
                      return null;
                    }
                    
                    return (
                      <div key={key}>
                        <dt className="text-muted-foreground font-medium capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                        <dd className="text-foreground">{String(value)}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
