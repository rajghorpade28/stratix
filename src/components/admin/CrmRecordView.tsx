"use client";

import { useState } from "react";
import { format } from "date-fns";
import { updateRequestStatus, saveAdminNotes } from "@/actions/admin";
import { Loader2, Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const statuses = ["NEW", "UNDER_REVIEW", "CONTACTED", "PROPOSAL_SENT", "APPROVED", "IN_PROGRESS", "COMPLETED", "CLOSED"];

export function CrmRecordView({ request, type }: { request: any, type: "website" | "app" | "graphics" | "automation" | "contact" }) {
  const [status, setStatus] = useState(request.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [adminNotes, setAdminNotes] = useState(request.adminNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  let dataObj: any = {};
  try {
    dataObj = JSON.parse(request.data || "{}");
  } catch (e) {}

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    setUpdatingStatus(true);
    try {
      await updateRequestStatus(type, request.id, newStatus);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      await saveAdminNotes(type, request.id, adminNotes);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNotes(false);
    }
  };

  const renderField = (label: string, value: any) => {
    let displayValue = value;
    if (value === undefined || value === null || value === "") {
      displayValue = "Not Provided";
    } else if (typeof value === "boolean") {
      displayValue = value ? "Yes" : "No";
    } else if (Array.isArray(value)) {
      displayValue = value.length > 0 ? value.join(", ") : "Not Provided";
    }
    
    return (
      <div className="mb-4">
        <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</dt>
        <dd className={`text-sm ${displayValue === "Not Provided" ? "text-muted-foreground italic" : "text-foreground font-medium"}`}>
          {displayValue}
        </dd>
      </div>
    );
  };

  const renderWebsiteFields = () => {
    const { businessInfo = {}, features = {}, contentAvailability = {} } = dataObj;
    
    return (
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-heading font-bold border-b border-border pb-2 mb-4 text-primary">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Business Name", businessInfo.name)}
            {renderField("Email", businessInfo.email)}
            {renderField("Phone", businessInfo.phone)}
            {renderField("WhatsApp", businessInfo.whatsapp)}
            {renderField("Services / Products", businessInfo.services)}
            {renderField("Social Links", businessInfo.social)}
          </div>
          {renderField("Business Description", businessInfo.description)}
          {renderField("Business Address", businessInfo.address)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {renderField("Has Logo", businessInfo.hasLogo)}
            {renderField("Has Domain", businessInfo.hasDomain)}
            {renderField("Has Hosting", businessInfo.hasHosting)}
          </div>
          {renderField("Reference Sites", businessInfo.referenceSites)}
        </section>

        <section>
          <h3 className="text-lg font-heading font-bold border-b border-border pb-2 mb-4 text-primary">Website Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Website Type", dataObj.customWebsiteType || dataObj.websiteType)}
            {renderField("Main Goal", dataObj.customMainGoal || dataObj.mainGoal)}
            {renderField("Design Style", dataObj.designStyle)}
            {renderField("Content Storage", dataObj.contentStorage)}
            {renderField("Storage Usage", dataObj.storageUsage)}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-heading font-bold border-b border-border pb-2 mb-4 text-primary">Pages & Features</h3>
          {renderField("Essential Pages", dataObj.essentialPages)}
          {renderField("Custom Pages", dataObj.customPages)}
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Communication Features", features.communication)}
            {renderField("Booking Features", features.booking)}
            {renderField("Selling Features", features.selling)}
            {renderField("Management Features", features.management)}
            {renderField("Marketing Features", features.marketing)}
            {renderField("Security Features", features.security)}
          </div>
          {renderField("Custom Features", features.custom)}
        </section>

        <section>
          <h3 className="text-lg font-heading font-bold border-b border-border pb-2 mb-4 text-primary">Content Availability</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {renderField("Logo", contentAvailability.logo)}
            {renderField("Business Photos", contentAvailability.photos)}
            {renderField("Videos", contentAvailability.videos)}
            {renderField("Text / Copy", contentAvailability.text)}
            {renderField("Product Photos", contentAvailability.productPhotos)}
            {renderField("Brand Guidelines", contentAvailability.brandGuidelines)}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-heading font-bold border-b border-border pb-2 mb-4 text-primary">Additional Notes</h3>
          {renderField("Client Notes", dataObj.additionalNotes)}
        </section>
      </div>
    );
  };

  const renderGenericFields = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-heading font-bold border-b border-border pb-2 mb-4 text-primary">Raw Submission Data</h3>
        <dl className="grid grid-cols-1 gap-4">
          {Object.entries(dataObj).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              return (
                <div key={key}>
                  <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{key}</dt>
                  <dd className="pl-4 border-l-2 border-border text-sm space-y-2">
                    {Object.entries(value as object).map(([subKey, subVal]) => (
                      <div key={subKey}><span className="text-muted-foreground">{subKey}:</span> {String(subVal)}</div>
                    ))}
                  </dd>
                </div>
              );
            }
            return renderField(key, value);
          })}
        </dl>
      </div>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  let quoteBreakdownObj: any = null;
  if (request.quoteBreakdown) {
    try {
      quoteBreakdownObj = JSON.parse(request.quoteBreakdown);
    } catch(e){}
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* LEFT COLUMN: The CRM Record (Form Data) */}
      <div className="flex-1 bg-card border border-border rounded-xl shadow-sm p-6 lg:p-8">
        {type === "website" ? renderWebsiteFields() : renderGenericFields()}
      </div>

      {/* RIGHT COLUMN: Operations & Timeline */}
      <div className="w-full lg:w-96 space-y-6">
        
        {/* Status Controller */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Operations Workflow</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Current Status</label>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updatingStatus}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-accent disabled:opacity-50"
                >
                  {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
                {updatingStatus && <Loader2 className="animate-spin text-accent shrink-0" size={18} />}
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Request Timeline</label>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{format(new Date(request.createdAt), "MMM d, yyyy HH:mm")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">{format(new Date(request.updatedAt), "MMM d, yyyy HH:mm")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quotation Calculator (Website only) */}
        {type === "website" && request.calculatedQuote && (
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Quotation Engine</h3>
            
            <div className="space-y-3 mb-6">
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
                <div className="text-xs font-bold text-accent uppercase mb-1">Final Calculated Quote</div>
                <div className="text-3xl font-heading font-bold text-foreground">{formatPrice(request.calculatedQuote)}</div>
              </div>
              <div className="bg-muted/50 border border-border/50 rounded-lg p-3 text-center">
                <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Estimated Timeline</div>
                <div className="text-lg font-bold text-foreground">{request.calculatedTimeline} Days Maximum</div>
              </div>
            </div>

            {quoteBreakdownObj && (
              <div className="space-y-2 text-sm">
                <h4 className="font-bold text-xs uppercase text-muted-foreground border-b border-border/50 pb-2 mb-3">Cost Breakdown</h4>
                <div className="flex justify-between"><span className="text-muted-foreground">Base Cost:</span> <span>{formatPrice(quoteBreakdownObj.baseCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Goal Cost:</span> <span>{formatPrice(quoteBreakdownObj.goalCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Page Cost:</span> <span>{formatPrice(quoteBreakdownObj.pageCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Feature Cost:</span> <span>{formatPrice(quoteBreakdownObj.featureCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Storage Cost:</span> <span>{formatPrice(quoteBreakdownObj.storageCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Design Buffers:</span> <span>{formatPrice(quoteBreakdownObj.designCost + quoteBreakdownObj.revisionBuffer)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Content Buffers:</span> <span>{formatPrice(quoteBreakdownObj.contentCreationBuffer)}</span></div>
              </div>
            )}
          </div>
        )}

        {/* Admin Notes */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Internal Notes</h3>
          <p className="text-xs text-muted-foreground mb-3">
            These notes are strictly internal and will never be visible to the client. Use this for follow-ups and meeting summaries.
          </p>
          <Textarea 
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            className="min-h-[150px] text-sm mb-3"
            placeholder="Write internal notes here..."
          />
          <button 
            onClick={handleSaveNotes}
            disabled={savingNotes}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {savingNotes ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Notes
          </button>
        </div>

      </div>

    </div>
  );
}
