'use server';

import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import { getTranslations } from 'next-intl/server';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
const saltRounds = 10;


type PayloadType = {
    email: string;
    password:string;
}

export default async function SignupAction(payload: PayloadType) {
  const t = await getTranslations('Auth');
  const signupSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('errors.invalidEmail'))
            .required(t('errors.required')),
        password: Yup.string()
            .min(8, t('errors.minPassword'))
            .matches(/[A-Z]/, t('errors.needUppercase'))
            .matches(/[0-9]/, t('errors.needNumber'))
            .required(t('errors.required')),
    });

  let success = false;
  try {
    const validatedData = await signupSchema.validate(payload, { abortEarly: false });
    const { email, password } = validatedData;

    const userExists = await prisma.user.findUnique({
        where: { email },
    });
    if (userExists) {
        return { error: t('errors.emailExists') };
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    success = true;
  } catch(error) {
      if (error instanceof Yup.ValidationError) {
          return { error: error.errors };
      }
      console.error('Signup Error:', error);
      return { error: t('errors.internalError') };
  }

  if (success) redirect('/dashboard');
}
