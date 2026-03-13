import type { Painting } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const json = ref<Painting[]>()

  return { json }
})
