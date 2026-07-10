import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../../services/authApi";

export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar?: string | null;
    resume?: string | null;
    githubLink?: string | null;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")!) : null,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const data = await authService.login(credentials.email, credentials.password);
            return data;
        } catch (error: any) {
            const message = error.response?.data?.detail || error.response?.data?.non_field_errors?.[0] || "Invalid email or password";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (
        userData: { fullName: string; email: string; password: string; confirmPassword: string; avatar: File | null; resume: File | null },
        thunkAPI
    ) => {
        try {
            const data = await authService.register(
                userData.fullName,
                userData.email,
                userData.password,
                userData.confirmPassword,
                userData.avatar,
                userData.resume
            );
            return data;
        } catch (error: any) {
            const errData = error.response?.data;
            let message = "Registration failed.";
            if (errData) {
                if (typeof errData === "object") {
                    const keys = Object.keys(errData);
                    if (keys.length > 0) {
                        message = `${keys[0]}: ${errData[keys[0]][0]}`;
                    }
                } else {
                    message = errData;
                }
            }
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    try {
        const refresh = localStorage.getItem("refreshToken");
        if (refresh) {
            await authService.logout(refresh);
        }
    } catch (error) {
        console.error("Logout endpoint failed, clearing client state anyway", error);
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentUser");
    }
});

export const loadCurrentUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
    try {
        const data = await authService.getCurrentUser();
        return data;
    } catch (error: any) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentUser");
        return thunkAPI.rejectWithValue("Session expired");
    }
});

export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async (
        userData: { fullName?: string; email?: string; avatar?: File | null; resume?: File | null; githubLink?: string | null },
        thunkAPI
    ) => {
        try {
            const data = await authService.updateProfile(
                userData.fullName,
                userData.email,
                userData.avatar,
                userData.resume,
                userData.githubLink
            );
            return data;
        } catch (error: any) {
            const errData = error.response?.data;
            let message = "Failed to update profile.";
            if (errData && typeof errData === "object") {
                const keys = Object.keys(errData);
                if (keys.length > 0) {
                    message = `${keys[0]}: ${errData[keys[0]][0]}`;
                }
            }
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logoutState: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            state.loading = false;
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("currentUser");
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = {
                id: action.payload.user.id,
                fullName: action.payload.user.full_name,
                email: action.payload.user.email,
                avatar: action.payload.user.avatar,
                resume: action.payload.user.resume,
                githubLink: action.payload.user.github_link,
            };
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
            
            localStorage.setItem("accessToken", action.payload.access);
            localStorage.setItem("refreshToken", action.payload.refresh);
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            state.loading = false;
        });

        
        builder.addCase(loadCurrentUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.user = {
                id: action.payload.id,
                fullName: action.payload.full_name,
                email: action.payload.email,
                avatar: action.payload.avatar,
                resume: action.payload.resume,
                githubLink: action.payload.github_link,
            };
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        });
        builder.addCase(loadCurrentUser.rejected, (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        });

        
        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = {
                id: action.payload.id,
                fullName: action.payload.full_name,
                email: action.payload.email,
                avatar: action.payload.avatar,
                resume: action.payload.resume,
                githubLink: action.payload.github_link,
            };
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearError, logoutState } = authSlice.actions;
export default authSlice.reducer;
