import { getRequestsByType } from "@/actions/admin";
import { RequestsTableClient } from "@/components/admin/RequestsTableClient";

export default async function AdminRequestsPage({ params }: { params: { type: string } }) {
  const type = params.type as "website" | "app" | "graphics" | "automation" | "contact";
  
  const titleMap = {
    website: "Website Requests",
    app: "App Requests",
    graphics: "Graphics Requests",
    automation: "Automation Requests",
    contact: "Contact Submissions"
  };

  const requests = await getRequestsByType(type);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold">{titleMap[type]}</h2>
        <div className="text-sm text-muted-foreground">Total: {requests.length}</div>
      </div>

      <RequestsTableClient initialRequests={requests} type={type} />
    </div>
  );
}
