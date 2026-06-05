import { getRequestById } from "@/actions/admin";
import { notFound } from "next/navigation";
import { CrmRecordView } from "@/components/admin/CrmRecordView";

export default async function AdminRequestDetailsPage({ params }: { params: { type: string, id: string } }) {
  const request = await getRequestById(params.type, params.id);

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold capitalize">{params.type} CRM Record</h2>
        <div className="text-sm text-muted-foreground font-mono">ID: {request.id}</div>
      </div>

      <CrmRecordView request={request} type={params.type as any} />
    </div>
  );
}
