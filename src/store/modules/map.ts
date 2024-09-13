import { defineStore } from "pinia"

export const useMapStore = defineStore('map', () => {
    const search = ref<string>("")
    const specify = ref<string>("")
    function setSpecify (value: string){
      specify.value = value
    }
    return { search,specify,setSpecify }
  })