import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPersistedState);
// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store);
}
// export * from "./modules/user";
export { store };
