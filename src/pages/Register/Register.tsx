import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import RegisterForm from "./RegisterForm";
import Divider from "../../components/auth/Divider";
import SocialLogin from "../../components/auth/SocialLogin";
import { useAuth } from "../../hooks/useAuth";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();

    const handleRegisterSubmit = async (data: any) => {
        const res = await register(
            data.fullName,
            data.email,
            data.password,
            data.confirmPassword,
            data.avatar,
            data.resume
        );
        if (res.success) {
            toast.success("Account created successfully! Please sign in.");
            navigate("/login");
        } else {
            toast.error(res.message || "Registration failed.");
        }
    };

    return (
        <AuthLayout>
            <AuthHeader title="Create your account" />
            
            <RegisterForm onSubmit={handleRegisterSubmit} isLoading={loading} />
            
            <Divider />
            <SocialLogin />
            
            <div className="text-center mt-6 text-[13px] font-medium text-slate-400 dark:text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-bold ml-1 transition-colors">
                    Sign in
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Register;
