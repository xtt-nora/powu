import { LanguageEnum } from "./enums/LanguageEnum";

const { pkg } = __APP_INFO__;

const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

const defaultSettings: AppSettings = {
  title: pkg.name,
  version: pkg.version,
  showSettings: true,
  tagsView: true,
  fixedHeader: true,
  sidebarLogo: true,
  language: LanguageEnum.ZH_CN,
  themeColor: "#4080FF",
  watermarkEnabled: false,
  watermarkContent: pkg.name,
};

export default defaultSettings;
