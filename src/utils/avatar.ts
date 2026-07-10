
export const getAvatarUrl = (avatar: string | null | undefined): string | null => {
    if (!avatar || typeof avatar !== "string") return null;

    const trimmed = avatar.trim();
    if (trimmed === "" || trimmed === "/media/" || trimmed === "/media" || trimmed.endsWith("/media/") || trimmed.endsWith("/media")) {
        return null;
    }

    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }

    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `http://127.0.0.1:8000${cleanPath}`;
};

