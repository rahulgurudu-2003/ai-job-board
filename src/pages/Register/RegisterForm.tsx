import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Mail, User, Loader2, Camera, UploadCloud, FileText, X } from "lucide-react";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import { emailValidation, passwordValidation, nameValidation } from "../../utils/validation";

interface RegisterFormProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const passwordVal = watch("password");

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const resumeInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const removeAvatar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setAvatarFile(null);
        setAvatarPreview(null);
        if (avatarInputRef.current) avatarInputRef.current.value = "";
    };

    const removeResume = (e: React.MouseEvent) => {
        e.stopPropagation();
        setResumeFile(null);
        if (resumeInputRef.current) resumeInputRef.current.value = "";
    };

    const handleFormSubmit = (data: any) => {
        onSubmit({
            ...data,
            avatar: avatarFile,
            resume: resumeFile,
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            
            <div className="flex flex-col items-center mb-4">
                <label className="block text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Profile Avatar
                </label>
                <div className="relative w-20 h-20">
                    <div 
                        onClick={() => avatarInputRef.current?.click()}
                        className="w-full h-full rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer flex items-center justify-center overflow-hidden transition-colors bg-slate-50 dark:bg-slate-800/40 group"
                    >
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center">
                                <Camera size={20} className="group-hover:text-blue-500 transition-colors" />
                                <span className="text-[10px] mt-1 font-bold">Upload</span>
                            </div>
                        )}
                    </div>
                    {avatarPreview && (
                        <button 
                            type="button"
                            onClick={removeAvatar}
                            className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-md hover:shadow-lg transition-all duration-200 z-10 cursor-pointer border border-white dark:border-slate-900"
                        >
                            <X size={10} />
                        </button>
                    )}
                </div>
                <input 
                    type="file" 
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            <AuthInput
                label="Full name"
                type="text"
                icon={User}
                error={errors.fullName?.message}
                disabled={isLoading}
                placeholder="Enter your full name"
                {...register("fullName", nameValidation)}
            />

            <AuthInput
                label="Email address"
                type="email"
                icon={Mail}
                error={errors.email?.message}
                disabled={isLoading}
                placeholder="Enter your email address"
                {...register("email", emailValidation)}
            />

            <PasswordInput
                label="Password"
                error={errors.password?.message}
                disabled={isLoading}
                placeholder="Create a password"
                {...register("password", passwordValidation)}
            />

            <PasswordInput
                label="Confirm Password"
                error={errors.confirmPassword?.message}
                disabled={isLoading}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === passwordVal || "Passwords fields must match.",
                })}
            />

            
            <div>
                <label className="block text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Upload Resume
                </label>
                <div 
                    onClick={() => resumeInputRef.current?.click()}
                    className="w-full min-h-[5.5rem] border border-dashed border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-900/30 transition-all duration-200"
                >
                    {resumeFile ? (
                        <div className="flex items-center justify-between w-full bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 p-2.5 rounded-xl">
                            <div className="flex items-center gap-3 truncate">
                                <span className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <FileText size={18} />
                                </span>
                                <div className="truncate text-left">
                                    <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200 truncate leading-none">
                                        {resumeFile.name}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1">
                                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={removeResume}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <UploadCloud size={24} className="text-slate-400 dark:text-slate-500 mx-auto mb-1.5" />
                            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200">
                                Click to upload your resume
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1">
                                PDF, DOC, or DOCX (Max 5MB)
                            </p>
                        </div>
                    )}
                </div>
                <input 
                    type="file" 
                    ref={resumeInputRef}
                    onChange={handleResumeChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/70 !text-white text-[14px] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Creating Account...
                    </>
                ) : (
                    "Sign Up"
                )}
            </button>
        </form>
    );
};

export default RegisterForm;
