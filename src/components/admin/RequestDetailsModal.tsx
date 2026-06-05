import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  type: string;
}

export function RequestDetailsModal({ isOpen, onClose, request, type }: RequestDetailsModalProps) {
  if (!isOpen || !request) return null;

  let dataObj: any = {};
  try {
    dataObj = JSON.parse(request.data || "{}");
  } catch (e) {}

  let breakdown: any = null;
  if (request.quoteBreakdown) {
    try {
      breakdown = JSON.parse(request.quoteBreakdown);
    } catch (e) {}
  }

  const name = request.name || request.user?.name || dataObj.businessInfo?.name || dataObj.name || "Guest";
  const email = request.email || request.user?.email || dataObj.businessInfo?.email || dataObj.email || "N/A";
  const phone = request.phone || request.user?.phone || dataObj.businessInfo?.phone || dataObj.phone || "N/A";
  const businessName = dataObj.businessInfo?.name || dataObj.company || "N/A";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

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
          className="bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative"
        >
          <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center z-10">
            <h2 className="text-xl font-heading font-bold">Request Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Client Info */}
            <section>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-border pb-2">Client Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Business</p>
                  <p className="font-medium">{businessName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Request Type</p>
                  <p className="font-medium capitalize">{type}</p>
                </div>
                {dataObj.websiteType && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-1">Website Type</p>
                    <p className="font-medium">{dataObj.websiteType}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground mb-1">Status</p>
                  <p className="font-medium">{request.status}</p>
                </div>
              </div>
            </section>

            {/* Calculations Engine (Only for Website Requests right now) */}
            {breakdown && (
              <section className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-accent/20 pb-2 flex justify-between items-center">
                  <span>Quotation Engine (Internal)</span>
                  <span className="text-xs text-muted-foreground font-normal normal-case">v{request.calculationVersion || 1.0}</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pricing Breakdown */}
                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold border-b border-border pb-1">Price Breakdown</h4>
                    <div className="flex justify-between text-muted-foreground"><span>Base Website</span> <span>{formatPrice(breakdown.baseCost)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Goal Complexity</span> <span>{formatPrice(breakdown.goalCost)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Additional Pages</span> <span>{formatPrice(breakdown.pagesCost)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Design Style</span> <span>{formatPrice(breakdown.designCost)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Features</span> <span>{formatPrice(breakdown.featuresCost)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Storage</span> <span>{formatPrice(breakdown.storageCost)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Missing Content</span> <span>{formatPrice(breakdown.missingContentCost)}</span></div>
                    
                    <div className="flex justify-between font-semibold pt-2 border-t border-border"><span>Subtotal</span> <span>{formatPrice(breakdown.subtotal)}</span></div>
                    <div className="flex justify-between text-destructive"><span>+ 15% Buffer</span> <span>{formatPrice(breakdown.bufferCost)}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border text-foreground"><span>Final Quote</span> <span>{formatPrice(breakdown.finalQuote)}</span></div>
                  </div>

                  {/* Timeline Breakdown */}
                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold border-b border-border pb-1">Timeline Breakdown</h4>
                    <div className="flex justify-between text-muted-foreground"><span>Base Days</span> <span>{breakdown.baseDays} Days</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Goal Days</span> <span>{breakdown.goalDays} Days</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Page Days</span> <span>{breakdown.pageDays} Days</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Design Days</span> <span>{breakdown.designDays} Days</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Feature Days</span> <span>{breakdown.featureDays} Days</span></div>
                    
                    <div className="flex justify-between font-semibold pt-2 border-t border-border"><span>Total Base Days</span> <span>{breakdown.totalDays} Days</span></div>
                    <div className="flex justify-between text-destructive"><span>+ 20-30% Buffer</span> <span>Revisions & Testing</span></div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border text-foreground"><span>Final Timeline</span> <span>{breakdown.finalMinDays} - {breakdown.finalMaxDays} Days</span></div>
                  </div>
                </div>
              </section>
            )}

            {/* Raw Form Responses */}
            <section>
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-border pb-2">Complete Form Responses</h3>
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-xs font-mono text-muted-foreground">
                  {JSON.stringify(dataObj, null, 2)}
                </pre>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
