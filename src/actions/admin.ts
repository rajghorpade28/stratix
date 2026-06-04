"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Helper to check admin access
async function checkAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function getDashboardStats() {
  await checkAdmin();

  const [
    totalUsers,
    totalWebsiteRequests,
    totalAppRequests,
    totalGraphicsRequests,
    totalAutomationRequests,
    totalContactSubmissions,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.websiteRequest.count(),
    prisma.appRequest.count(),
    prisma.graphicsRequest.count(),
    prisma.automationRequest.count(),
    prisma.contactLead.count(),
  ]);

  const totalLeads = 
    totalWebsiteRequests + 
    totalAppRequests + 
    totalGraphicsRequests + 
    totalAutomationRequests + 
    totalContactSubmissions;

  return {
    totalUsers,
    totalLeads,
    totalWebsiteRequests,
    totalAppRequests,
    totalGraphicsRequests,
    totalAutomationRequests,
    totalContactSubmissions,
  };
}

export async function getRecentActivity() {
  await checkAdmin();

  // Fetch recent from each table
  const [websites, apps, graphics, automation, contacts, users] = await Promise.all([
    prisma.websiteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { name: true, email: true } } } }),
    prisma.appRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { name: true, email: true } } } }),
    prisma.graphicsRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { name: true, email: true } } } }),
    prisma.automationRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { name: true, email: true } } } }),
    prisma.contactLead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  // Combine and sort
  const combined = [
    ...websites.map(w => ({ type: 'Website Request', date: w.createdAt, data: w })),
    ...apps.map(a => ({ type: 'App Request', date: a.createdAt, data: a })),
    ...graphics.map(g => ({ type: 'Graphics Request', date: g.createdAt, data: g })),
    ...automation.map(a => ({ type: 'Automation Request', date: a.createdAt, data: a })),
    ...contacts.map(c => ({ type: 'Contact Submission', date: c.createdAt, data: c })),
    ...users.map(u => ({ type: 'New User Registered', date: u.createdAt, data: u })),
  ];

  combined.sort((a, b) => b.date.getTime() - a.date.getTime());

  return combined.slice(0, 10);
}

export async function getUsers() {
  await checkAdmin();
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      emailVerified: true,
    }
  });
}

export async function getUserDetails(id: string) {
  await checkAdmin();
  return prisma.user.findUnique({
    where: { id },
    include: {
      websiteRequests: true,
      appRequests: true,
      graphicsRequests: true,
      automationRequests: true,
      contactLeads: true,
    }
  });
}

export async function getRequestsByType(type: "website" | "app" | "graphics" | "automation" | "contact") {
  await checkAdmin();
  
  switch (type) {
    case "website":
      return prisma.websiteRequest.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } });
    case "app":
      return prisma.appRequest.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } });
    case "graphics":
      return prisma.graphicsRequest.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } });
    case "automation":
      return prisma.automationRequest.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } });
    case "contact":
      return prisma.contactLead.findMany({ orderBy: { createdAt: 'desc' }, include: { user: true } });
    default:
      return [];
  }
}

export async function updateRequestStatus(type: string, id: string, status: string) {
  await checkAdmin();
  
  switch (type) {
    case "website":
      return prisma.websiteRequest.update({ where: { id }, data: { status } });
    case "app":
      return prisma.appRequest.update({ where: { id }, data: { status } });
    case "graphics":
      return prisma.graphicsRequest.update({ where: { id }, data: { status } });
    case "automation":
      return prisma.automationRequest.update({ where: { id }, data: { status } });
    case "contact":
      return prisma.contactLead.update({ where: { id }, data: { status } });
    default:
      throw new Error("Invalid request type");
  }
}
