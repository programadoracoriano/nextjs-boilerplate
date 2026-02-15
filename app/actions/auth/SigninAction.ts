'use server';

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function SigninAction(formData: any) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/dashboard",
    });

  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error.type === 'CredentialsSignin' || error.code === 'credentials') {
      return { error: "E-mail ou palavra-passe incorretos." };
    }

    console.error("Erro de autenticação:", error);
    return { error: "Ocorreu um erro inesperado ao tentar fazer login." };
  }
}
