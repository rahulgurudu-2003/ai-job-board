import React from "react";

interface AuthHeaderProps {
    title: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
    return (
        <div className="flex flex-col items-center text-center mb-5">
            <h2 className="text-[1.75rem] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                {title}
            </h2>
        </div>
    );
};

export default AuthHeader;
