import React, { type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
    error?: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, icon: Icon, error, className = "", ...props }, ref) => {
        return (
            <div>
                <label className="block text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    {label}
                </label>
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-400 dark:text-slate-500">
                        <Icon size={16} />
                    </span>
                    <input
                        ref={ref}
                        className={`w-full h-11 pl-11 pr-4 bg-transparent rounded-xl border ${
                            error
                                ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                                : "border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500"
                        } outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-[14px] font-medium transition-all duration-200 disabled:opacity-50 ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <span className="block text-[12px] font-semibold text-red-500 mt-1">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
