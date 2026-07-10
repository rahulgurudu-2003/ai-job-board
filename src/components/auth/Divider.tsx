import React from "react";

const Divider: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800/80"></div>
            </div>
            <span className="relative px-3 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                Or continue with
            </span>
        </div>
    );
};

export default Divider;
