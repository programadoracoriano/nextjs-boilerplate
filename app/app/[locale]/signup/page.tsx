import  SignupForm from '../../../components/auth/SignupForm';
import  SignupAction from '../../../actions/auth/SignupAction';

interface SignupProps {
  params: Promise<{ locale: string }>;
}

export default  async function Signup({ params }:SignupProps) {
    const {locale} = await params;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="mb-4">

            </div>
            <SignupForm onSubmit={SignupAction} />
        </div>
    );
}
