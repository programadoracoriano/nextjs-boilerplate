'use client';

import  SignupForm from '../../../components/auth/SignupForm';
import  SignupAction from '../../../actions/auth/SignupAction';

export default  function Signup() {
    const handleSignup = async (data: any) => {
        const result = await SignupAction(data);
        if (result?.error) console.log(result.error)
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="mb-4">

            </div>

            <SignupForm onSubmit={handleSignup} />
        </div>
    );
}
