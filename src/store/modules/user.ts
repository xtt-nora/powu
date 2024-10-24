import { defineStore } from "pinia";
import { UserState } from "@/store/interface";
export const useUserStore = defineStore("user", () => {
  const token = ref<string>("");
  const userInfo = ref<any>({ name: "Geeker" });
  function setToken(value: string) {
    token.value = value;
  }
  function setUserInfo(value: UserState["userInfo"]) {
    userInfo.value = value;
  }
  return { token, userInfo, setToken, setUserInfo };
});
