import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const inputEmail = credentials.email as string;
        const inputPassword = credentials.password as string;

        // Admin Auto-Seeding Logic
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (adminEmail && adminPassword && inputEmail === adminEmail) {
          let adminUser = await prisma.user.findUnique({
            where: { email: adminEmail },
          });

          if (!adminUser) {
            const passwordHash = await bcrypt.hash(adminPassword, 12);
            adminUser = await prisma.user.create({
              data: {
                name: "Administrator",
                email: adminEmail,
                passwordHash,
                role: "ADMIN",
                emailVerified: new Date(),
              },
            });
          }

          const passwordsMatch = await bcrypt.compare(inputPassword, adminUser.passwordHash!);
          if (passwordsMatch) {
            return {
              id: adminUser.id,
              name: adminUser.name,
              email: adminUser.email,
              role: adminUser.role,
              emailVerified: adminUser.emailVerified,
            };
          }
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: inputEmail },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          inputPassword,
          user.passwordHash
        );

        if (passwordsMatch) {
          // Return user object without sensitive data
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});
