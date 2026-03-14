import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const isDialogOpen = ref<boolean>(false)

  function openDialog() {
    isDialogOpen.value = true
  }

  function closeDialog() {
    isDialogOpen.value = false
  }

  return { isDialogOpen, openDialog, closeDialog }
})
