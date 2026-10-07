export function withBaseAsset(path) {
    if (!path) {
        return path;
    }

    const baseUrl =
        typeof import.meta !== "undefined" && import.meta.env
            ? import.meta.env.BASE_URL || "/"
            : "/";
    const normalized = path.startsWith("/") ? path : `/${path}`;

    return `${baseUrl}${normalized.replace(/^\/+/, "")}`;
}
