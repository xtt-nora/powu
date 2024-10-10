export function useDark() {
  const isDark = ref(false);
  const toggleDark = () => {
    isDark.value = !isDark.value;
  };
  const isDarkMode = computed(() => isDark.value);
  return {
    isDark,
    toggleDark,
    isDarkMode,
  };
}
