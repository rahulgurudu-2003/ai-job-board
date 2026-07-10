import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Loader2 } from "lucide-react";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import { emailValidation, passwordValidation } from "../../utils/validation";

interface LoginFormProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AuthInput
                label="Email address"
                type="email"
                icon={Mail}
                error={errors.email?.message}
                disabled={isLoading}
                placeholder="Enter your email"
                {...register("email", emailValidation)}
            />

            <div>
                <PasswordInput
                    label="Password"
                    error={errors.password?.message}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    {...register("password", passwordValidation)}
                />
                <div className="flex items-center justify-between mt-2.5">
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            disabled={isLoading}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                            {...register("rememberMe")}
                        />
                        Remember me
                    </label>
                    <a
                        href="#forgot"
                        className="text-[12px] font-bold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                    >
                        Forgot password?
                    </a>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/70 !text-white text-[14px] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Signing In...
                    </>
                ) : (
                    "Sign In"
                )}
            </button>
        </form>
    );
};

export default LoginForm;
