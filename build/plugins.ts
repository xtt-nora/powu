import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";
import { PluginOption } from "vite";
const pathSrc = resolve(__dirname, "src");
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return [
    vue(),
    UnoCSS({
      hmrTopLevelAwait: false,
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver({
          importStyle: "sass",
        }),
        // 自动导入图标组件
        IconsResolver({}),
      ],
      eslintrc: {
        // 是否自动生成 eslint 规则，建议生成之后设置 false
        enabled: false,
        // 指定自动导入函数 eslint 规则的文件
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
      // 是否在 vue 模板中自动导入
      vueTemplate: true,
      // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
      dts: false,
      // dts: "src/types/auto-imports.d.ts",
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: "sass",
        }),
        // 自动注册图标组件
        IconsResolver({
          // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          enabledCollections: ["ep"],
        }),
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ["src/components", "src/**/components"],
      // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
      dts: false,
      // dts: "src/types/components.d.ts",
    }),
    Icons({
      // 自动安装图标库
      autoInstall: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(pathSrc, "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ];
};
