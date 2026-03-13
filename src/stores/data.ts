import type { Painting } from '@/types/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const json = ref<Painting[]>([])

  const isDataReady = ref(false)

  const lastSeen = ref(0)

  const getLastSeen = computed(() => {
    return json.value[lastSeen.value]!.name.replace(/ /g, '').trim()
  })

  return { json, isDataReady, lastSeen, getLastSeen }
})
