'use client';

import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';

type PayloadProps = {
    email: string;
    password: string;
    confirmPassword: string;
}

type SigninFormProps = {
    onSubmit: (data: PayloadProps) => void
}

export default function SignupForm({onSubmit}: SigninFormProps) {
    const t = useTranslations('Auth');
    const schema = Yup.object().shape({
        email: Yup.string()
            .email(t('errors.invalidEmail'))
            .required(t('errors.required')),
        password: Yup.string()
            .min(6, t('errors.minPassword'))
            .required(t('errors.required')),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('errors.passwordsMustMatch'))
        .required(t('errors.required')),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<PayloadProps>({
        resolver: yupResolver(schema)
    });

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('signInTitle')}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">{t('emailLabel')}</label>
                    <input
                        {...register('email')}
                        type="email"
                        className={`border p-2 rounded focus:ring-2 focus:outline-none text-black ${
                            errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">{errors.email.message}</span>
                    )}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">{t('passwordLabel')}</label>
                    <input
                        {...register('password')}
                        type="password"
                        className={`border p-2 rounded focus:ring-2 focus:outline-none text-black ${
                            errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-xs">{errors.password.message}</span>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">{t('confirmPasswordLabel')}</label>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        className={`border p-2 rounded focus:ring-2 focus:outline-none text-black ${
                            errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
                >
                    {isSubmitting ? t('loading') : t('signInButton')}
                </button>
            </form>
        </div>
    );
}
