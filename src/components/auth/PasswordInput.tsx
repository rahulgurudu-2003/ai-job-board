import React, { useState, type InputHTMLAttributes } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div>
                <label className="block text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    {label}
                </label>
                <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-400 dark:text-slate-500">
                        <Lock size={16} />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        ref={ref}
                        className={`w-full h-11 pl-11 pr-11 bg-transparent rounded-xl border ${
                            error
                                ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                                : "border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500"
                        } outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-[14px] font-medium transition-all duration-200 disabled:opacity-50 ${className}`}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
