import SigninForm  from '@/components/auth/SigninForm';
import SigninAction from '@/actions/auth/SigninAction';

interface SignupProps {
  params: Promise<{ locale: string }>;
}

export default async function SigninPage({ params }:SignupProps){
  const {locale} = await params;
  return (
    <div>
      <SigninForm onSubmit={SigninAction} />
    </div>
  )
}
