import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';
import { prisma } from './lib/prisma';


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
  Credentials({
    async authorize(credentials) {
      const schema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
      });

      try {
        const validatedData = await schema.validate(credentials);

        const user = await prisma.user.findUnique({
          where: { email: validatedData.email }
        });

        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(validatedData.password, user.password);

        if (passwordsMatch) {
          return {
            id: String(user.id),
            email: user.email,
          };
        }
        return null;

      } catch (error) {
        return null;
      }
    },
  })
],
});
