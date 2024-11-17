import { authService } from '@/lib/services/auth.service';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', value: 'email' },
        password: { label: 'password', value: 'password' },
        remember_me: { label: 'remember_me', value: 'remember_me' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }

          const { email, password, remember_me } = credentials;

          const { data: user } = await authService.login({
            email,
            password,
            remember_me: remember_me == 'true' ? true : false,
          });

          return {
            id: user._id,
            ...user,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
});

export { handler as GET, handler as POST };
