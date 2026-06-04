import { getUsers } from "@/actions/admin";
import Link from "next/link";
import { format } from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold">User Management</h2>
        <div className="text-sm text-muted-foreground">Total Users: {users.length}</div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Registered</th>
                <th className="px-6 py-4">Verified</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-accent/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{user.name || "N/A"}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4">{format(user.createdAt, "MMM d, yyyy")}</td>
                  <td className="px-6 py-4">
                    {user.emailVerified ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/admin/users/${user.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No users found.
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
