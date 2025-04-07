export const saveToken = (token, remember) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
};


export const saveUser = (user, remember) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const userData =
        localStorage.getItem("user") || sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
};

export const removeUser = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
};