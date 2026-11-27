import { demoUser } from "@/src/datas/site";
import { readStorage, writeStorage } from "@/src/utils/localStorage";

const key = "ticketon-user";
const accountsKey = "ticketon-accounts";

export const authService = {
  async login({email}){
    const normalized = email.trim().toLowerCase()
    const accounts = readStorage(accountsKey, [])
    const user = accounts.find((account) => account.email == normalized) || (normalized == demoUser.email ? demoUser : { name: normalized.split("@")[0], email: normalized })
    writeStorage(key, user)
    return user
  },
  async register({name, email}){
    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
    }
    const accounts = readStorage(accountsKey, []).filter((account) => account.email !== user.email)
    writeStorage(accountsKey, [...accounts, user]);
    writeStorage(key,user);
    return user;
  },
  async getMe(){
    return readStorage(key, null)
  },
  async logout(){
    localStorage.removeItem(key);
  },
}
