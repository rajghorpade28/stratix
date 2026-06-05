const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const reqs = await prisma.websiteRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
  console.log("Latest WebsiteRequest records:", reqs.map(r => ({ id: r.id, date: r.createdAt })));
}

test().catch(console.error).finally(() => prisma.$disconnect());
