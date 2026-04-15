
export const parseToken = (token: string) => {
    const payload = token.split(".")[1];
    return JSON.parse(decodeURIComponent(encodeURI(globalThis.atob(payload.replace(/-/g, "+").replace(/_/g, "/")))))
}