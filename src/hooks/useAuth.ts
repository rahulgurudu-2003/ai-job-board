import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { loginUser, registerUser, logoutUser, loadCurrentUser, clearError, updateUserProfile } from "../store/auth/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error, accessToken } = useSelector((state: RootState) => state.auth);

    const login = async (email: string, password: string) => {
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            return { success: true };
        } else {
            return { success: false, message: result.payload as string };
        }
    };

    const register = async (fullName: string, email: string, password: string, confirmPassword: string, avatar: File | null, resume: File | null) => {
        const result = await dispatch(registerUser({ fullName, email, password, confirmPassword, avatar, resume }));
        if (registerUser.fulfilled.match(result)) {
            return { success: true };
        } else {
            return { success: false, message: result.payload as string };
        }
    };

    const updateProfile = async (fullName?: string, email?: string, avatar?: File | null, resume?: File | null, githubLink?: string | null) => {
        const result = await dispatch(updateUserProfile({ fullName, email, avatar, resume, githubLink }));
        if (updateUserProfile.fulfilled.match(result)) {
            return { success: true };
        } else {
            return { success: false, message: result.payload as string };
        }
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    const loadUser = () => {
        dispatch(loadCurrentUser());
    };

    const resetError = () => {
        dispatch(clearError());
    };

    return {
        user,
        loading,
        error,
        isAuthenticated: !!accessToken,
        login,
        register,
        updateProfile,
        logout,
        loadUser,
        resetError,
    };
};
