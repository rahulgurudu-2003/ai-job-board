import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import LoginForm from "./LoginForm";
import Divider from "../../components/auth/Divider";
import SocialLogin from "../../components/auth/SocialLogin";
import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const handleLoginSubmit = async (data: any) => {
        const res = await login(data.email, data.password);
        if (res.success) {
            toast.success("Successfully logged in!");
            navigate("/");
        } else {
            toast.error(res.message || "Invalid credentials.");
        }
    };

    return (
        <AuthLayout>
            <AuthHeader title="Sign in to your account" />
            
            <LoginForm onSubmit={handleLoginSubmit} isLoading={loading} />
            
            <Divider />
            <SocialLogin />
            
            <div className="text-center mt-6 text-[13px] font-medium text-slate-400 dark:text-slate-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-bold ml-1 transition-colors">
                    Sign up
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Login;
