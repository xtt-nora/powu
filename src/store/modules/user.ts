import { defineStore } from "pinia";
import { UserState } from "@/store/interface";
import piniaPersistConfig from "../helper/persist";
export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string>("");
    const userInfo = ref<any>({ name: "Nora" });
    function setToken(value: string) {
      token.value = value;
    }
    function setUserInfo(value: UserState["userInfo"]) {
      userInfo.value = value;
    }
    return { token, userInfo, setToken, setUserInfo };
  },
  {
    persist: piniaPersistConfig("user"),
  }
);
