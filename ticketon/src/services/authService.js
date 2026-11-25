import api from "@/lib/api";

export const authService = {
  async login(credentials) {
    const { data } = await api.post("/auth/login/", credentials);
    return data.user ?? data;
  },
  async register(values) {
    const { data } = await api.post("/auth/register/", values);
    return data.user ?? data;
  },
  async getMe() {
    const { data } = await api.get("/auth/me/");
    return data.user ?? data;
  },
  async logout() {
    await api.post("/auth/logout/");
  },
};
