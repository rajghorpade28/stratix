import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Support | STRATIX",
};

export default async function SupportPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Support & Assistance</h1>
        <p className="text-muted-foreground">Need help with a project or have a general inquiry? We are here for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-heading font-bold mb-2">Email Support</h2>
          <p className="text-muted-foreground text-sm mb-6">
            For detailed inquiries, project updates, or billing questions, email our support team. We aim to respond within 24 hours.
          </p>
          <a href="mailto:support@stratix.com" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            support@stratix.com
          </a>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
            <Phone className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-xl font-heading font-bold mb-2">Phone & WhatsApp</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Need an immediate response? Call us or drop a message on WhatsApp during business hours.
          </p>
          <a href="tel:+918369877139" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            +91 8369877139
          </a>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm max-w-4xl mt-6 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-heading font-bold mb-2">Open a Support Ticket</h2>
          <p className="text-muted-foreground text-sm">
            If you are experiencing a technical issue with a delivered project, you can open a formal support ticket.
          </p>
        </div>
        <div className="shrink-0">
          <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Contact Support
          </Link>
        </div>
      </div>

      <div className="max-w-4xl flex items-center gap-2 text-sm text-muted-foreground mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
        <Clock className="w-4 h-4" />
        <span>Business Hours: Monday to Saturday, 10:00 AM - 7:00 PM (IST)</span>
      </div>
    </div>
  );
}
