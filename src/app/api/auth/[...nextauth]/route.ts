import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        
        try {
          if (isSupabaseConfigured && supabaseAdmin) {
            // Query Supabase for admin user
            const { data: user, error } = await supabaseAdmin
              .from('admin_users')
              .select('*')
              .eq('email', credentials.email)
              .single();
            
            if (error || !user) {
              throw new Error('Invalid credentials');
            }
            
            // Verify password
            const isValid = await bcrypt.compare(credentials.password, user.password_hash);
            
            if (!isValid) {
              throw new Error('Invalid credentials');
            }
            
            // Update last login
            await supabaseAdmin
              .from('admin_users')
              .update({ last_login: new Date().toISOString() })
              .eq('id', user.id);
            
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          } else {
            // Development fallback
            const devEmail = 'admin@jesustravel.me';
            const devPassword = 'jesusadmin123'; // CHANGE THIS in production
            
            if (credentials.email === devEmail && credentials.password === devPassword) {
              return {
                id: 'dev-admin',
                email: devEmail,
                name: 'Dev Admin',
                role: 'admin',
              };
            }
            
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
